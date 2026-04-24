import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "src/models";

@Table({ tableName: "devotionals", schema: "casa-church", timestamps: true })
export class Devotional extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @Column({ type: DataType.STRING(160), allowNull: false })
  declare title: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare devotionalDate: Date;

  @Column({ type: DataType.STRING(120), allowNull: true })
  declare verseReference?: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare verseText?: string | null;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare imageUrl?: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare videoUrl?: string | null;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare published: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: true })
  declare createdBy?: string | null;

  @BelongsTo(() => User)
  declare author?: User;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
