"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_MODULE_VALUES = exports.AdminModules = exports.ADMIN_FULL_ACCESS = exports.UserRoles = void 0;
exports.normalizeAdminModules = normalizeAdminModules;
exports.getEffectiveAdminModules = getEffectiveAdminModules;
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["ADMIN"] = "admin";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
exports.ADMIN_FULL_ACCESS = "*";
var AdminModules;
(function (AdminModules) {
    AdminModules["DASHBOARD"] = "dashboard";
    AdminModules["HOME_CONTENT"] = "home_content";
    AdminModules["PAGE_CONTENT"] = "page_content";
    AdminModules["GALLERY"] = "gallery";
    AdminModules["EVENTS"] = "events";
    AdminModules["DEVOTIONALS"] = "devotionals";
    AdminModules["SERMONS"] = "sermons";
    AdminModules["LESSONS"] = "lessons";
    AdminModules["POSTS"] = "posts";
    AdminModules["USERS"] = "users";
    AdminModules["ACTIVITIES"] = "activities";
    AdminModules["CHURCH_HOUSES"] = "church_houses";
    AdminModules["CONTACTS"] = "contacts";
    AdminModules["DONATIONS"] = "donations";
})(AdminModules || (exports.AdminModules = AdminModules = {}));
exports.ADMIN_MODULE_VALUES = Object.values(AdminModules);
function normalizeAdminModules(modules) {
    if (!Array.isArray(modules))
        return [];
    const normalized = Array.from(new Set(modules.filter((item) => typeof item === "string"))).filter((item) => item === exports.ADMIN_FULL_ACCESS || exports.ADMIN_MODULE_VALUES.includes(item));
    if (normalized.includes(exports.ADMIN_FULL_ACCESS)) {
        return [exports.ADMIN_FULL_ACCESS];
    }
    return normalized;
}
function getEffectiveAdminModules(role, modules) {
    if (role !== UserRoles.ADMIN) {
        return [];
    }
    const normalized = normalizeAdminModules(modules);
    return normalized.length > 0 ? normalized : [exports.ADMIN_FULL_ACCESS];
}
//# sourceMappingURL=user.types.js.map