import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { Courses } from "./courses.model";

@Controller("courses")
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  getAll(): any {
    return this.courseService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): any {
    return this.courseService.getById(id);
  }

  @Post()
  create(@Body() course: Courses): any {
    return this.courseService.create(course);
  }

  @Put(":id")
  replace(@Param("id") id: string, @Body() newData: Courses) {
    return this.courseService.replace(id, newData);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() newData: Courses) {
    return this.courseService.update(id, newData);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.courseService.delete(id);
  }
}
