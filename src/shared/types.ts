export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  subscribed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  courseId: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  chapterId: string;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  chapterId: string;
}

export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  option1: string;
  option2: string;
  option3: string;
  examId: string;
}

export interface Result {
    id: string;
    score: number;
    userId: string;
    examId: string;
}