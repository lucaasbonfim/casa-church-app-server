import { InjectModel } from "@nestjs/sequelize";
import { Courses } from "../models/index";

export class CoursesRepository {
  constructor(
    @InjectModel(Courses)
    private readonly coursesModel: typeof Courses
  ) {}

  async findAll(): Promise<Courses[] | null> {
    const courses = await this.coursesModel.findAll();
    return courses;
  }

  async getById(id: string): Promise<Courses | null> {
    const course = await this.coursesModel.findByPk(id);
    return course;
  }

  async create(course: Courses): Promise<Courses> {
    const newCourse = await this.coursesModel.create(course);

    return newCourse;
  }

  async replace(id: string, newData: Courses): Promise<Courses> {
    const course = await this.getById(id);

    return await course!.update(newData);
  }

  async update(id: string, newData: Partial<Courses>): Promise<Courses> {
    const course = await this.getById(id);

    return await course!.update(newData);
  }

  async delete(id: string): Promise<null> {
    const course = await this.getById(id);

    await course!.destroy();

    return null;
  }
}
