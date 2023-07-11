import { Course, User } from '../../shared/types';
import path from 'path';
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';

import { Datastore } from '..';
import { LOGGER } from '../../utils/logging';
import { SEED_USERS } from './seeds';

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    const { ENV } = process.env;
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'geospark.sqlite'),
      driver: sqlite3.Database,
    });
    await this.db.run('PRAGMA foreign_keys = ON');
    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id, email, password, firstName, lastName , isAdmin , subscribed) VALUES (?,?,?,?,?,?,?)',
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.isAdmin,
      user.subscribed
    );
  }
  async deleteUser(id: string): Promise<void> {
    await this.db.run(`DELETE FROM users WHERE id = ?`, id);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }
  getAllUsers(): Promise<User[]> {
    return this.db.all<User[]>(`SELECT * FROM users`);
  }
  async ActivateUser(id: string): Promise<void> {
    await this.db.run(`UPDATE users SET subscribed = 1 WHERE id = ?`, id);
  }
  async DeactivateUser(id: string): Promise<void> {
    await this.db.run(`UPDATE users SET subscribed = 0 WHERE id = ?`, id);
  }
  ///courses Sql
  async CreateCourse(course: Course): Promise<void> {
    await this.db.run(
      'INSERT INTO courses (id, title, description, userId) VALUES (?,?,?,?)',
      course.id,
      course.title,
      course.description,
      course.userId
    );
  }
  getCourseById(id: string): Promise<Course | undefined> {
    return this.db.get<Course>(`SELECT * FROM courses WHERE id = ?`, id);
  }
  getAllCourses(): Promise<Course[]> {
    return this.db.all<Course[]>(`SELECT * FROM courses`);
  }
  async DeleteCourse(id: string): Promise<void> {
    await this.db.run(`DELETE FROM courses WHERE id = ?`, id);
  }
}
/*
async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?,?,?,?,?)',
      post.id,
      post.title,
      post.url,
      post.postedAt,
      post.userId
    );
  }
  public create: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (req, res) => {
    // TODO: better error messages
    if (!req.body.title || !req.body.url) {
      return res.sendStatus(400);
    }

    const existing = await this.db.getPostByUrl(req.body.url);
    if (existing) {
      // A post with this url already exists
      return res.status(400).send({ error: ERRORS.DUPLICATE_URL });
    }

    const post: Post = {
      id: crypto.randomUUID(),
      postedAt: Date.now(),
      title: req.body.title,
      url: req.body.url,
      userId: res.locals.userId,
    };
    await this.db.createPost(post);
    return res.sendStatus(200);
  };

*/
