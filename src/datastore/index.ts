import { CourseDao } from './dao/CourseDao';
import { UserDao } from './dao/UserDao';
import { ChapterDao } from './dao/chaptersDao';
import { ExamDao } from './dao/examDao';
import { questionsDao } from './dao/questionsDao';
import { VideoDao } from './dao/videoDao';
import { SqlDataStore } from './sql';

export interface Datastore
  extends UserDao,
    CourseDao,
    ChapterDao,
    VideoDao,
    ExamDao,
    questionsDao {}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}
