import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany,
} from "sequelize-typescript";
import { Courses } from "src/models";

@Table({
  tableName: "student",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Student extends Model<Student> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(8),
    unique: true,
  })
  registration: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;

  @BelongsToMany(() => Courses, { through: "studentCourses" })
  courses: Courses[];
}
