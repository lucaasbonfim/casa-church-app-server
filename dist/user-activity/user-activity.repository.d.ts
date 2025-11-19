import { UserActivity } from "src/user-activity/entities/user-activity.model";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
export declare class UserActivityRepository {
    private readonly userActivityModel;
    constructor(userActivityModel: typeof UserActivity);
    create(data: any): Promise<UserActivity>;
    findAll(findQuery: FindUserActivityQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        activities: UserActivity[];
    }>;
    findById(id: string): Promise<UserActivity | null>;
    delete(id: string): Promise<void>;
}
