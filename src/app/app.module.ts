import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentsModule } from "src/students/students.module";
import { CoursesModule } from "src/courses/courses.module";
import { AuthModule } from "src/auth/auth.module";
import { DatabaseModule } from "src/config/database.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
