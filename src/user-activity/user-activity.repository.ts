import { InjectModel } from "@nestjs/sequelize";
import { UserActivity } from "src/user-activity/entities/user-activity.model";
import { User } from "src/models";
import { FindUserActivityQueryDto } from "./dto/find-user-activity-query.dto";
import { Op } from "sequelize";

export class UserActivityRepository {
  constructor(
    @InjectModel(UserActivity)
    private readonly userActivityModel: typeof UserActivity
  ) {}

  async create(data) {
    const created = await this.userActivityModel.create(data);
    return created;
  }

  async findAll(findQuery: FindUserActivityQueryDto) {
    const { page, limit, userId, action } = findQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    if (action) {
      where.action = action;
    } else {
      where.action = { [Op.ne]: "GET" };
    }

    const { rows, count } = await this.userActivityModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const activities = await this.attachUsers(rows);

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      activities,
    };
  }

  async findById(id: string) {
    const activity = await this.userActivityModel.findByPk(id);
    if (!activity) return activity;

    const [enriched] = await this.attachUsers([activity]);
    return enriched;
  }

  async delete(id: string) {
    const activity = await this.findById(id);
    if (activity) await activity.destroy();
    return;
  }

  private async attachUsers(activities: UserActivity[]) {
    const validUserIds = Array.from(
      new Set(
        activities
          .map((activity) => activity.userId)
          .filter((userId): userId is string => this.isUuid(userId))
      )
    );

    if (validUserIds.length === 0) {
      activities.forEach((activity) => activity.setDataValue("user", null as any));
      return activities;
    }

    const users = await User.findAll({
      where: { id: { [Op.in]: validUserIds } },
      attributes: ["id", "name", "email", "role"],
    });

    const usersById = new Map(users.map((user) => [user.id, user]));

    activities.forEach((activity) => {
      const user = activity.userId ? usersById.get(activity.userId) || null : null;
      activity.setDataValue("user", user as any);
    });

    return activities;
  }

  private isUuid(value: string | null): value is string {
    if (!value) return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }
}
