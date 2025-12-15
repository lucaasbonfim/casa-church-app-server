import { Lesson } from "src/models";
import { FindLessonQueryDto } from "./dto/find-lesson-query.dto";
export declare class LessonsRepository {
    private readonly lessonModel;
    constructor(lessonModel: typeof Lesson);
    create(data: any): Promise<Lesson>;
    findAll(findLessonQuery: FindLessonQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        lessons: Lesson[];
    }>;
    findById(id: string): Promise<Lesson | null>;
    update(id: string, data: any): Promise<Lesson>;
    delete(id: string): Promise<void>;
}
