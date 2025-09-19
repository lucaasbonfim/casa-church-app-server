import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "courses",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Courses extends Model<Courses> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
  })
  duration_hours: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;
}
