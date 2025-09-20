import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { StudentsRepository } from "./students.repository";
import { Student } from "./entities/students.model";

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async getAll(): Promise<Student[] | null> {
    return await this.studentsRepository.findAll();
  }

  async getById(id: string): Promise<Student | null> {
    const student = await this.studentsRepository.findById(id);

    if (!student) throw new NotFoundException("Aluno não encontrado");
    return student;
  }

  async create(
    student: Student
  ): Promise<{ message: string; newStudent: Student }> {
    const newStudent = await this.studentsRepository.create(student);
    return {
      message: "Aluno criado com sucesso.",
      newStudent,
    };
  }

  async replace(
    id: string,
    newData: Student
  ): Promise<{ message: string; updatedStudent: Student }> {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    const updatedStudent = await this.studentsRepository.replace(id, newData);
    return {
      message: "Aluno atualizado com sucesso.",
      updatedStudent,
    };
  }

  async update(
    id: string,
    newData: Partial<Student>
  ): Promise<{ message: string; updatedStudent: Student }> {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    const updatedStudent = await this.studentsRepository.update(id, newData);
    return {
      message: "Aluno atualizado com sucesso.",
      updatedStudent,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    await this.studentsRepository.delete(id);
    return {
      message: "Aluno deletado com sucesso.",
    };
  }
}
