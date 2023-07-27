import { CourseDao } from './dao/CourseDao';
import { UserDao } from './dao/UserDao';
import { ChapterDao } from './dao/chaptersDao';
import { ExamDao } from './dao/examDao';
import { questionsDao } from './dao/questionsDao';
import { VideoDao } from './dao/videoDao';
import { SqlDataStore } from './sql';
import {ResultsDao} from "./dao/ResultsDao";

export interface Datastore
  extends UserDao,
    CourseDao,
    ChapterDao,
    VideoDao,
    ExamDao,
    questionsDao ,
ResultsDao{}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}
