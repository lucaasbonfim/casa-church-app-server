import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { AuthUsersService } from "../auth-users.service";
export declare class AuthTokenGuard implements CanActivate {
    private readonly jwtService;
    private readonly authUsersService;
    constructor(jwtService: JwtService, authUsersService: AuthUsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    extractTokenFromHeader(req: Request): string | undefined;
}
