import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/config/database.module";
import { UsersModule } from "src/users/users.module";
import { EventsModule } from "src/events/events.module";
import { RegistrationsModule } from "src/registrations/registrations.module";
import { PostsModule } from "src/posts/posts.module";
import { SermonsModule } from "src/sermons/sermons.module";
import { ContactMessagesModule } from "src/contact-messages/contact-messages.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    EventsModule,
    RegistrationsModule,
    PostsModule,
    SermonsModule
    ContactMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
