import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/config/database.module";
import { UsersModule } from "src/users/users.module";
import { EventsModule } from "src/events/events.module";
import { RegistrationsModule } from "src/registrations/registrations.module";
import { PostsModule } from "src/posts/posts.module";
import { SermonsModule } from "src/sermons/sermons.module";
import { LessonsModule } from "src/lessons/lessons.module";
import { ContactMessagesModule } from "src/contact-messages/contact-messages.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventsModule,
    RegistrationsModule,
    PostsModule,
    LessonsModule,
    SermonsModule,
    ContactMessagesModule,
  ],
})
export class AppModule {}
