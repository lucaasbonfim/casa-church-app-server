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
import { CreateStudentDto } from "./dto/create-student.dto";
import { ReplaceStudentDto } from "./dto/replace-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

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
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(":id")
  replace(
    @Param("id") id: string,
    @Body() replaceStudentDto: ReplaceStudentDto
  ) {
    return this.studentsService.replace(id, replaceStudentDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.studentsService.delete(id);
  }
}
