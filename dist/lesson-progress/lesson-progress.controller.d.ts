import { LessonProgressService } from "./lesson-progress.service";
import { CreateLessonProgressDto } from "./dto/create-lesson-progress.dto";
import { UpdateLessonProgressDto } from "./dto/update-lesson-progress.dto";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
export declare class LessonProgressController {
    private readonly lessonProgressService;
    constructor(lessonProgressService: LessonProgressService);
    create(createLessonProgressDto: CreateLessonProgressDto, tokenPayLoad: TokenPayloadDto): Promise<{
        message: string;
        progress: import("./entities/lesson-progress.model").LessonProgress;
    }>;
    findAll(tokenPayLoad: TokenPayloadDto, findLessonProgressDto: FindLessonProgressDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        lessons: import("./entities/lesson-progress.model").LessonProgress[];
    }>;
    update(lessonId: string, updateLessonProgressDto: UpdateLessonProgressDto, tokenPayLoad: TokenPayloadDto): Promise<{
        message: string;
        progress: import("./entities/lesson-progress.model").LessonProgress | null;
    }>;
    remove(lessonId: string, tokenPayLoad: TokenPayloadDto): Promise<{
        message: string;
    }>;
}
