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
import { StudentsService } from "./students.service";
import { Student } from "./students.model";

@Controller("students")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll() {
    return this.studentsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.studentsService.getById(id);
  }

  @Post()
  create(@Body() student: Student) {
    return this.studentsService.create(student);
  }

  @Put(":id")
  replace(@Param("id") id: string, @Body() newData: Student) {
    return this.studentsService.replace(id, newData);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() newData: Partial<Student>) {
    return this.studentsService.update(id, newData);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.studentsService.delete(id);
  }
}
