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
import { Courses } from "./entities/courses.model";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { ReplaceCourseDto } from "./dto/replace-course.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.courseService.getById(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Put(":id")
  replace(@Param("id") id: string, @Body() replaceCourseDto: ReplaceCourseDto) {
    return this.courseService.replace(id, replaceCourseDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.courseService.delete(id);
  }
}
