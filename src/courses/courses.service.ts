import { Injectable, NotFoundException } from "@nestjs/common";
import { CoursesRepository } from "./courses.repository";
import { Courses } from "./entities/courses.model";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { ReplaceCourseDto } from "./dto/replace-course.dto";

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CoursesRepository) {}

  async getAll() {
    return await this.courseRepository.findAll();
  }

  async getById(id: string) {
    const student = await this.courseRepository.getById(id);

    if (!student) throw new NotFoundException("Curso não encontrado");
    return student;
  }

  async create(createCourseDto: CreateCourseDto) {
    const newCourse = await this.courseRepository.create(createCourseDto);
    return {
      message: "Curso criado com sucesso",
      newCourse,
    };
  }

  async replace(id: string, replaceCourseDto: ReplaceCourseDto) {
    const course = await this.courseRepository.getById(id);

    if (!course) throw new NotFoundException("Curso não encontrado");

    const updatedCourse = await this.courseRepository.replace(
      id,
      replaceCourseDto
    );
    return {
      message: "Curso atualizado com sucesso",
      updatedCourse,
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.getById(id);

    if (!course) throw new NotFoundException("Curso não encontrado");

    const updatedCourse = await this.courseRepository.update(
      id,
      updateCourseDto
    );
    return {
      message: "Curso atualizado com sucesso",
      updatedCourse,
    };
  }

  async delete(id: string) {
    const course = await this.courseRepository.getById(id);
    if (!course) throw new NotFoundException("Curso não encontrado");

    await this.courseRepository.delete(id);
    return {
      message: "Curso deletado com sucesso",
    };
  }
}
