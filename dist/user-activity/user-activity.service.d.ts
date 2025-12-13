import { CreateUserActivityDto } from "./dto/create-user-activity.dto";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
import { UserActivityRepository } from "./user-activity.repository";
export declare class UserActivityService {
    private readonly userActivityRepository;
    constructor(userActivityRepository: UserActivityRepository);
    logActivity(userId: string, method: string, endpoint: string, entityId?: string | null, description?: string): Promise<void>;
    create(createDto: CreateUserActivityDto): Promise<{
        message: string;
        activity: import("./entities/user-activity.model").UserActivity;
    }>;
    findAll(query: FindUserActivityQueryDto): Promise<{
        total: number;
        page: number;
        totalPages: number;
        activities: import("./entities/user-activity.model").UserActivity[];
    }>;
    findOne(id: string): Promise<import("./entities/user-activity.model").UserActivity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
