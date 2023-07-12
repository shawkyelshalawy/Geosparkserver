import { CourseDao } from './dao/CourseDao';
import { UserDao } from './dao/UserDao';
import { ChapterDao } from './dao/chaptersDao';
import { SqlDataStore } from './sql';

export interface Datastore extends UserDao, CourseDao, ChapterDao {}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}
