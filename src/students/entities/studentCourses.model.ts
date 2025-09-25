import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
} from "sequelize-typescript";
import { Student, Courses } from "src/models";

@Table({
  tableName: "studentCourses",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
})
export class StudentCourses extends Model<StudentCourses> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  student_id: string;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  course_id: string;
}
