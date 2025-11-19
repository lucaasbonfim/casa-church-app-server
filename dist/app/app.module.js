"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../config/database.module");
const data_cache_module_1 = require("../config/data-cache.module");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const events_module_1 = require("../events/events.module");
const registrations_module_1 = require("../registrations/registrations.module");
const posts_module_1 = require("../posts/posts.module");
const sermons_module_1 = require("../sermons/sermons.module");
const lessons_module_1 = require("../lessons/lessons.module");
const contact_messages_module_1 = require("../contact-messages/contact-messages.module");
const donations_module_1 = require("../donations/donations.module");
const comments_module_1 = require("../comments/comments.module");
const likes_module_1 = require("../likes/likes.module");
const locations_module_1 = require("../locations/locations.module");
const lesson_progress_module_1 = require("../lesson-progress/lesson-progress.module");
const event_feedbacks_module_1 = require("../event-feedbacks/event-feedbacks.module");
const user_activity_module_1 = require("../user-activity/user-activity.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            data_cache_module_1.DataCacheModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            registrations_module_1.RegistrationsModule,
            posts_module_1.PostsModule,
            lessons_module_1.LessonsModule,
            lesson_progress_module_1.LessonProgressModule,
            sermons_module_1.SermonsModule,
            contact_messages_module_1.ContactMessagesModule,
            donations_module_1.DonationsModule,
            comments_module_1.CommentsModule,
            likes_module_1.LikesModule,
            locations_module_1.LocationsModule,
            event_feedbacks_module_1.EventFeedbacksModule,
            user_activity_module_1.UserActivityModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map