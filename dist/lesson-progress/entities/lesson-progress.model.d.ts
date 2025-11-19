import { Model } from "sequelize-typescript";
import { LessonProgressStatus } from "../types/lesson-progress.types";
export declare class LessonProgress extends Model<LessonProgress> {
    id: string;
    userId: string;
    lessonId: string;
    status: LessonProgressStatus;
    createdAt: Date;
    updatedAt: Date;
}
