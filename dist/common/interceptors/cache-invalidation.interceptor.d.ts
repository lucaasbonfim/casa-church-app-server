import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class CacheInvalidationInterceptor implements NestInterceptor {
    private readonly cacheManager;
    private readonly logger;
    constructor(cacheManager: any);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
