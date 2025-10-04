import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { LessonsRepository } from "./lessons.repository";
import { USER_ADMIN_ROLE } from "src/users/user.constants";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";

@Injectable()
export class LessonsService {
  constructor(private readonly LessonRepository: LessonsRepository) {}

  async create(
    createLessonDto: CreateLessonDto,
    tokenPayload: TokenPayloadDto
  ) {
    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const createdLesson = await this.LessonRepository.create(createLessonDto);

    return {
      message: "Aula criada com sucesso",
      sermon: createdLesson,
    };
  }

  async findAll(query: FindLessonQueryDto) {

    const lessons = await this.LessonRepository.findAll(query);

    return lessons;
  }

  async findOne(id: string) {
    const lesson = await this.LessonRepository.findById(id);

    if (!lesson) {
      throw new NotFoundException("Aula não encontrada");
    }

    return lesson;
  }

  async update(
    id: string,
    updateLessonDto: UpdateLessonDto,
    tokenPayload: TokenPayloadDto
  ) {
    const LessonExists = this.LessonRepository.findById(id);

    if (!LessonExists) {
      throw new NotFoundException("Aula não encontrada");
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    const updatedLesson = await this.LessonRepository.update(
      id,
      updateLessonDto
    );

    return {
      message: "Aula atualizada com sucesso",
      lesson: updatedLesson,
    };
  }

  async remove(id: string, tokenPayload: TokenPayloadDto) {
    const lessonExists = this.LessonRepository.findById(id);

    if (!lessonExists) {
      throw new NotFoundException("Sermão não encontrado");
    }

    if (tokenPayload.role !== USER_ADMIN_ROLE) {
      throw new ForbiddenException(
        "Você não tem permissão para acessar este recurso."
      );
    }

    await this.LessonRepository.delete(id);

    return {
      message: "Aula deletada com sucesso",
    };
  }
}
