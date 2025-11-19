import { LessonProgress } from "src/models";
import { TokenPayloadDto } from "src/auth/dto/token-payload.dto";
import { FindLessonProgressDto } from "./dto/find-lesson-progress-query.dto";
export declare class LessonProgressRepository {
    private readonly lessonProgressModel;
    constructor(lessonProgressModel: typeof LessonProgress);
    create(data: any): Promise<LessonProgress>;
    findAll(tokenPayload: TokenPayloadDto, findLessonProgressDto: FindLessonProgressDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        lessons: LessonProgress[];
    }>;
    findById(id: string): Promise<LessonProgress | null>;
    findByLessonAndUser(lessonId: string, userId: string): Promise<LessonProgress | null>;
    update(id: string, data: any): Promise<LessonProgress | null>;
    delete(id: string): Promise<null | undefined>;
}
