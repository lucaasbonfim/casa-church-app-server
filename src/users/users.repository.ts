import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models";
import { CreateUser } from "./types/user.types";
import { UpdateUser } from "./types/user.types";

export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(data: CreateUser) {
    const createdUser = await this.userModel.create(data);

    return createdUser;
  }

  async findAll() {
    return this.userModel.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async findById(id: string) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUser) {
    const user = await this.findById(id);

    return await user!.update(data);
  }

  async delete(id: string) {
    const user = await this.findById(id);
    await user!.destroy();

    return;
  }
}
