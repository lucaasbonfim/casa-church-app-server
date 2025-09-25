import { InjectModel } from "@nestjs/sequelize";
import { Courses } from "../models/index";

export class CoursesRepository {
  constructor(
    @InjectModel(Courses)
    private readonly coursesModel: typeof Courses
  ) {}

  async findAll() {
    const courses = await this.coursesModel.findAll();
    return courses;
  }

  async getById(id: string) {
    const course = await this.coursesModel.findByPk(id);
    return course;
  }

  async create(course) {
    const newCourse = await this.coursesModel.create(course);

    return newCourse;
  }

  async replace(id: string, newData) {
    const course = await this.getById(id);

    return await course!.update(newData);
  }

  async update(id: string, newData) {
    const course = await this.getById(id);

    return await course!.update(newData);
  }

  async delete(id: string) {
    const course = await this.getById(id);

    await course!.destroy();

    return null;
  }
}
