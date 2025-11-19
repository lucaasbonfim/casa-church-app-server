"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFeedback = exports.LessonProgress = exports.Location = exports.Comment = exports.Like = exports.Donation = exports.ContactMessage = exports.Lesson = exports.Sermon = exports.Post = exports.Registration = exports.Event = exports.User = exports.models = void 0;
const user_model_1 = require("../users/entities/user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
const event_model_1 = require("../events/entities/event.model");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return event_model_1.Event; } });
const registration_model_1 = require("../registrations/entities/registration.model");
Object.defineProperty(exports, "Registration", { enumerable: true, get: function () { return registration_model_1.Registration; } });
const post_model_1 = require("../posts/entities/post.model");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return post_model_1.Post; } });
const sermon_model_1 = require("../sermons/entities/sermon.model");
Object.defineProperty(exports, "Sermon", { enumerable: true, get: function () { return sermon_model_1.Sermon; } });
const lesson_model_1 = require("../lessons/entities/lesson.model");
Object.defineProperty(exports, "Lesson", { enumerable: true, get: function () { return lesson_model_1.Lesson; } });
const contact_message_model_1 = require("../contact-messages/entities/contact-message.model");
Object.defineProperty(exports, "ContactMessage", { enumerable: true, get: function () { return contact_message_model_1.ContactMessage; } });
const donation_model_1 = require("../donations/entities/donation.model");
Object.defineProperty(exports, "Donation", { enumerable: true, get: function () { return donation_model_1.Donation; } });
const comment_model_1 = require("../comments/entities/comment.model");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return comment_model_1.Comment; } });
const like_model_1 = require("../likes/entities/like.model");
Object.defineProperty(exports, "Like", { enumerable: true, get: function () { return like_model_1.Like; } });
const location_model_1 = require("../locations/entities/location.model");
Object.defineProperty(exports, "Location", { enumerable: true, get: function () { return location_model_1.Location; } });
const lesson_progress_model_1 = require("../lesson-progress/entities/lesson-progress.model");
Object.defineProperty(exports, "LessonProgress", { enumerable: true, get: function () { return lesson_progress_model_1.LessonProgress; } });
const event_feedback_model_1 = require("../event-feedbacks/entities/event-feedback.model");
Object.defineProperty(exports, "EventFeedback", { enumerable: true, get: function () { return event_feedback_model_1.EventFeedback; } });
exports.models = [
    user_model_1.User,
    event_model_1.Event,
    registration_model_1.Registration,
    post_model_1.Post,
    sermon_model_1.Sermon,
    lesson_model_1.Lesson,
    contact_message_model_1.ContactMessage,
    donation_model_1.Donation,
    like_model_1.Like,
    comment_model_1.Comment,
    location_model_1.Location,
    lesson_progress_model_1.LessonProgress,
    event_feedback_model_1.EventFeedback,
];
//# sourceMappingURL=index.js.map