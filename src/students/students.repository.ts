import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Courses, Student } from "../models/index";

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student
  ) {}

  async findAll(): Promise<Student[] | null> {
    const students = await this.studentModel.findAll();
    return students;
  }

  async findById(id: string): Promise<Student | null> {
    const student = await this.studentModel.findByPk(id, {
      include: [
        {
          model: Courses,
          through: { attributes: [] },
        },
      ],
    });
    return student;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.studentModel.findOne({
      where: {
        email: email,
      },
    });

    return student!;
  }

  async create(student: Student): Promise<Student> {
    const newStudent = await this.studentModel.create(student);

    return newStudent;
  }

  async replace(id: string, newData: Student): Promise<Student> {
    const student = await this.studentModel.findByPk(id);

    return await student!.update(newData);
  }

  async update(id: string, newData: Partial<Student>): Promise<Student> {
    const student = await this.studentModel.findByPk(id);

    return await student!.update(newData);
  }

  async delete(id: string): Promise<null> {
    const student = await this.studentModel.findByPk(id);

    student!.destroy();

    return null;
  }
}
