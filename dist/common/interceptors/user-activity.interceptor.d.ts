import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserActivityService } from "src/user-activity/user-activity.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserActivityInterceptor implements NestInterceptor {
    private readonly userActivityService;
    private readonly jwtService;
    constructor(userActivityService: UserActivityService, jwtService: JwtService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
