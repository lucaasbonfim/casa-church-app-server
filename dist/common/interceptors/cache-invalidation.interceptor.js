"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CacheInvalidationInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheInvalidationInterceptor = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const rxjs_1 = require("rxjs");
let CacheInvalidationInterceptor = CacheInvalidationInterceptor_1 = class CacheInvalidationInterceptor {
    cacheManager;
    logger = new common_1.Logger(CacheInvalidationInterceptor_1.name);
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const method = String(request?.method || "").toUpperCase();
        const mustInvalidate = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
        if (!mustInvalidate) {
            return next.handle();
        }
        return next.handle().pipe((0, rxjs_1.tap)(async () => {
            try {
                if (typeof this.cacheManager?.clear === "function") {
                    await this.cacheManager.clear();
                    return;
                }
                if (typeof this.cacheManager?.reset === "function") {
                    await this.cacheManager.reset();
                }
            }
            catch (error) {
                this.logger.warn(`Falha ao invalidar cache global: ${error?.message || error}`);
            }
        }));
    }
};
exports.CacheInvalidationInterceptor = CacheInvalidationInterceptor;
exports.CacheInvalidationInterceptor = CacheInvalidationInterceptor = CacheInvalidationInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheInvalidationInterceptor);
//# sourceMappingURL=cache-invalidation.interceptor.js.map