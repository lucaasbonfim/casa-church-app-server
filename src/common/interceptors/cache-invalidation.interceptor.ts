import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Observable, tap } from "rxjs";

@Injectable()
export class CacheInvalidationInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CacheInvalidationInterceptor.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = String(request?.method || "").toUpperCase();
    const mustInvalidate = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

    if (!mustInvalidate) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async () => {
        try {
          if (typeof this.cacheManager?.clear === "function") {
            await this.cacheManager.clear();
            return;
          }

          if (typeof this.cacheManager?.reset === "function") {
            await this.cacheManager.reset();
          }
        } catch (error) {
          this.logger.warn(`Falha ao invalidar cache global: ${error?.message || error}`);
        }
      })
    );
  }
}
