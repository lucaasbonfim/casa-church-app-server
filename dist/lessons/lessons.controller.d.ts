import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(createLessonDto: CreateLessonDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        sermon: import("./entities/lesson.model").Lesson;
    }>;
    findAll(findLessonQueryDto: FindLessonQueryDto): Promise<{
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
