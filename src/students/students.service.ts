import { Injectable } from "@nestjs/common";
import { NotFoundException, ConflictException } from "@nestjs/common";
import { StudentsRepository } from "./students.repository";
import { CreateStudentDto } from "./dto/create-student.dto";
import { ReplaceStudentDto } from "./dto/replace-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";

@Injectable()
export class StudentsService {
  constructor(private readonly studentsRepository: StudentsRepository) {}

  async getAll() {
    return await this.studentsRepository.findAll();
  }

  async getById(id: string) {
    const student = await this.studentsRepository.findById(id);

    if (!student) throw new NotFoundException("Aluno não encontrado");
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const existingStudent = await this.studentsRepository.findByEmail(
      createStudentDto.email
    );

    if (existingStudent)
      throw new ConflictException(
        "Já existe um aluno cadastrado com esse e-mail"
      );

    const newStudent = await this.studentsRepository.create(createStudentDto);
    return {
      message: "Aluno criado com sucesso.",
      newStudent,
    };
  }

  async replace(id: string, replaceStudentDto: ReplaceStudentDto) {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    const updatedStudent = await this.studentsRepository.replace(
      id,
      replaceStudentDto
    );
    return {
      message: "Aluno atualizado com sucesso.",
      updatedStudent,
    };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    const updatedStudent = await this.studentsRepository.update(
      id,
      updateStudentDto
    );
    return {
      message: "Aluno atualizado com sucesso.",
      updatedStudent,
    };
  }

  async delete(id: string) {
    const student = await this.studentsRepository.findById(id);
    if (!student) throw new NotFoundException("Aluno não encontrado");

    await this.studentsRepository.delete(id);
    return {
      message: "Aluno deletado com sucesso.",
    };
  }
}
