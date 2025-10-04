import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { AuthTokenGuard } from "src/auth/guard/auth-token.guard";
import { UseGuards } from "@nestjs/common";
import { TokenPayloadParam } from "src/auth/params/token-payload.param";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";

@UseGuards(AuthTokenGuard)
@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(
    @Body() createLessonDto: CreateLessonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.create(createLessonDto, tokenPayload);
  }

  @Get()
  findAll(
    @Query() findLessonQueryDto: FindLessonQueryDto
  ) {
    return this.lessonsService.findAll(findLessonQueryDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.update(id, updateLessonDto, tokenPayload);
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto
  ) {
    return this.lessonsService.remove(id, tokenPayload);
  }
}
