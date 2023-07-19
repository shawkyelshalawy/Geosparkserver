import {
  Chapter,
  Course,
  Exam,
  Question,
  User,
  Video,
} from '../../shared/types';
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
  async CreateChapter(chapter: Chapter): Promise<void> {
    await this.db.run(
      'INSERT INTO chapters (id, title, description, courseId) VALUES (?,?,?,?)',
      chapter.id,
      chapter.title,
      chapter.description,
      chapter.courseId
    );
  }
  async getChapterById(id: string): Promise<Chapter | undefined> {
    return this.db.get<Chapter>(`SELECT * FROM chapters WHERE id = ?`, id);
  }
  getChaptersByCourseId(courseId: string): Promise<Chapter[]> {
    return this.db.all<Chapter[]>(
      `SELECT * FROM chapters WHERE courseId = ?`,
      courseId
    );
  }
  async DeleteChapter(id: string): Promise<void> {
    await this.db.run(`DELETE FROM chapters WHERE id = ?`, id);
  }

  // Videos sql
  async AddVideo(video: Video): Promise<void> {
    await this.db.run(
      'INSERT INTO videos (id, title, url, chapterId) VALUES (?,?,?,?)',
      video.id,
      video.title,
      video.url,
      video.chapterId
    );
  }
  async getVideoById(id: string): Promise<Video | undefined> {
    return this.db.get<Video>(`SELECT * FROM videos WHERE id = ?`, id);
  }
  getChapterVideos(chapterId: string): Promise<Video[]> {
    return this.db.all<Video[]>(
      `SELECT * FROM videos WHERE chapterId = ?`,
      chapterId
    );
  }
  async DeleteVideo(id: string): Promise<void> {
    await this.db.run(`DELETE FROM videos WHERE id = ?`, id);
  }
  async CreateExam(exam: Exam): Promise<void> {
    await this.db.run(
      'INSERT INTO exams (id, title, courseId, chapterId) VALUES (?,?,?,?)',
      exam.id,
      exam.title,
      exam.courseId,
      exam.chapterId
    );
  }
  async getExamById(id: string): Promise<Exam | undefined> {
    return this.db.get<Exam>(`SELECT * FROM exams WHERE id = ?`, id);
  }
  async AddQuestion(question: Question): Promise<void> {
    await this.db.run(
      'INSERT INTO questions(id , question ,correctAnswer , examId) VALUES (?,?,?,?)',
      question.id,
      question.question,
      question.correctAnswer,
      question.examId
    );
  }
  async getQuestionById(id: string): Promise<Question | undefined> {
    return this.db.get<Question>(`SELECT * FROM questions WHERE id = ?`, id);
  }
}
