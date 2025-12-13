import { LessonProgressRepository } from "./lesson-progress.repository";
import { CreateLessonProgressDto } from "./dto/create-lesson-progress.dto";
import { UpdateLessonProgressDto } from "./dto/update-lesson-progress.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
export declare class LessonProgressService {
    private readonly lessonProgressRepository;
    constructor(lessonProgressRepository: LessonProgressRepository);
    create(createLessonProgressDto: CreateLessonProgressDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        progress: import("./entities/lesson-progress.model").LessonProgress;
    }>;
    findAll(tokenPayload: TokenPayloadDto, findLessonProgressDto: FindLessonProgressDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        lessons: import("./entities/lesson-progress.model").LessonProgress[];
    }>;
    update(lessonId: string, updateLessonProgressDto: UpdateLessonProgressDto, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
        progress: import("./entities/lesson-progress.model").LessonProgress | null;
    }>;
    remove(lessonId: string, tokenPayload: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
