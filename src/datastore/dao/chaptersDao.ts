import { Chapter } from '../../shared/types';

export interface ChapterDao {
  CreateChapter(chapter: Chapter): Promise<void>;
  getChapterById(id: string): Promise<Chapter | undefined>;
  DeleteChapter(id: string): Promise<void>;
  getChaptersByCourseId(courseId: string): Promise<Chapter[]>;
}
