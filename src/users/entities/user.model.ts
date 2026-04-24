import { Default } from "sequelize-typescript";
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { UserRoles } from "../types/user.types";

@Table({ tableName: "users", schema: "casa-church", timestamps: true })
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare profileImage?: string | null;

  @Default(UserRoles.USER)
  @Column(DataType.ENUM(...Object.values(UserRoles)))
  declare role: UserRoles;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare emailVerified: boolean;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare adminModules?: string[] | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare lastLoginAt?: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare emailVerifiedAt?: Date | null;

  @Column({ type: DataType.STRING(128), allowNull: true })
  declare emailVerificationTokenHash?: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare emailVerificationExpiresAt?: Date | null;

  @Column({ type: DataType.STRING(128), allowNull: true })
  declare passwordResetTokenHash?: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  declare passwordResetExpiresAt?: Date | null;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
