import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/config/database.module";
import { DataCacheModule } from "src/config/data-cache.module";
import { UsersModule } from "src/users/users.module";
import { EventsModule } from "src/events/events.module";
import { RegistrationsModule } from "src/registrations/registrations.module";
import { PostsModule } from "src/posts/posts.module";
import { SermonsModule } from "src/sermons/sermons.module";
import { LessonsModule } from "src/lessons/lessons.module";
import { ContactMessagesModule } from "src/contact-messages/contact-messages.module";
import { DonationsModule } from "src/donations/donations.module";
import { CommentsModule } from "src/comments/comments.module";
import { LikesModule } from "src/likes/likes.module";
import { LocationsModule } from "src/locations/locations.module";

@Module({
  imports: [
    DatabaseModule,
    DataCacheModule,
    AuthModule,
    UsersModule,
    EventsModule,
    RegistrationsModule,
    PostsModule,
    LessonsModule,
    SermonsModule,
    ContactMessagesModule,
    DonationsModule,
    CommentsModule,
    LikesModule,
    LocationsModule
  ],
})
export class AppModule {}
