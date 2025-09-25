import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Attributes } from "sequelize";
import { Courses, Student } from "../models/index";
import { CreateStudentDto } from "./dto/create-student.dto";

@Injectable()
export class StudentsRepository {
  constructor(
    @InjectModel(Student)
    private readonly studentModel: typeof Student
  ) {}

  async findAll() {
    const students = await this.studentModel.findAll();
    return students;
  }

  async findById(id: string) {
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

  async findByEmail(email: string) {
    const student = await this.studentModel.findOne({
      where: {
        email: email,
      },
    });

    return student!;
  }

  async create(student) {
    const newStudent = await this.studentModel.create(student);

    return newStudent;
  }

  async replace(id: string, newData) {
    const student = await this.studentModel.findByPk(id);

    return await student!.update(newData);
  }

  async update(id: string, newData) {
    const student = await this.studentModel.findByPk(id);

    return await student!.update(newData);
  }

  async delete(id: string) {
    const student = await this.studentModel.findByPk(id);

    student!.destroy();

    return null;
  }
}
