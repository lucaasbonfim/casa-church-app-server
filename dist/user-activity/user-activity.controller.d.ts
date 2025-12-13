import { UserActivityService } from "./user-activity.service";
import { CreateUserActivityDto } from "./dto/create-user-activity.dto";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
export declare class UserActivityController {
    private readonly userActivityService;
    constructor(userActivityService: UserActivityService);
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
