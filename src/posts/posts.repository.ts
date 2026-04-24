import { InjectModel } from "@nestjs/sequelize";
import { col, fn } from "sequelize";
import { Comment, Like, Post, User } from "src/models";
import { CreatePost } from "./types/post.types";
import { FindPostsQueryDto } from "./dto/find-posts-query.dto";

export class PostsRepository {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  async create(data) {
    const createdPost = await this.postModel.create(data);

    return createdPost;
  }

  async findAll(findPostsQuery: FindPostsQueryDto) {
    const { page, limit, userId, orderBy, orderDirection } = findPostsQuery;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;
    const { rows, count } = await this.postModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDirection]],
    });

    return {
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      posts: rows,
    };
  }

  async findById(id: string) {
    const post = await this.postModel.findByPk(id);

    return post;
  }

  async delete(id: string) {
    const post = await this.findById(id);
    await post!.destroy();

    return;
  }

  async findUsersByIds(userIds: string[]) {
    return User.findAll({
      where: {
        id: userIds,
      },
      attributes: ["id", "name", "profileImage"],
    });
  }

  async countCommentsByPostIds(postIds: string[]) {
    if (!postIds.length) return [];

    return Comment.findAll({
      where: {
        postId: postIds,
      },
      attributes: ["postId", [fn("COUNT", col("id")), "count"]],
      group: ["postId"],
      raw: true,
    });
  }

  async countLikesByPostIds(postIds: string[]) {
    if (!postIds.length) return [];

    return Like.findAll({
      where: {
        postId: postIds,
      },
      attributes: ["postId", [fn("COUNT", col("id")), "count"]],
      group: ["postId"],
      raw: true,
    });
  }

  async findCurrentUserLikesByPostIds(userId: string, postIds: string[]) {
    if (!userId || !postIds.length) return [];

    return Like.findAll({
      where: {
        userId,
        postId: postIds,
      },
      attributes: ["id", "postId"],
      raw: true,
    });
  }
}
