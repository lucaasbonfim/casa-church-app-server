import { Student } from "src/students/entities/students.model";
import { Courses } from "src/courses/entities/courses.model";
import { StudentCourses } from "src/students/entities/studentCourses.model";
import { User } from "src/users/entities/user.model";

export const models = [Student, Courses, StudentCourses, User];

export { Student, Courses, StudentCourses, User };
