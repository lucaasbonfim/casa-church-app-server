import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { LessonsRepository } from "./lessons.repository";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";
export declare class LessonsService {
    private readonly LessonRepository;
    constructor(LessonRepository: LessonsRepository);
    create(createLessonDto: CreateLessonDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        sermon: import("./entities/lesson.model").Lesson;
    }>;
    findAll(query: FindLessonQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        lessons: import("./entities/lesson.model").Lesson[];
    }>;
    findOne(id: string): Promise<import("./entities/lesson.model").Lesson>;
    update(id: string, updateLessonDto: UpdateLessonDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        lesson: import("./entities/lesson.model").Lesson;
    }>;
    remove(id: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
