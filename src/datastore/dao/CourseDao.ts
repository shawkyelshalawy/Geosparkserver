import { Course } from '../../shared/types';

export interface CourseDao {
  CreateCourse(course: Course): Promise<void>;
  getCourseById(id: string): Promise<Course | undefined>;
  DeleteCourse(id: string): Promise<void>;
}
