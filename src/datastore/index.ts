import { CourseDao } from './dao/CourseDao';
import { UserDao } from './dao/UserDao';
import { SqlDataStore } from './sql';

export interface Datastore extends UserDao, CourseDao {}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDataStore().openDb();
}
