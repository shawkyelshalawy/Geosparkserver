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
