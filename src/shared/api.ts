import { Chapter, Course, User, Video } from './types';

export type SignUpRequest = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export interface SignUpResponse {
  jwt: string;
}
export interface SignInRequest {
  email: string;
  password: string;
}

export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'id'>;
  jwt: string;
};

export interface ListUsersRequest {}
export type ListUsersResponse = {
  users: Pick<User, 'email' | 'firstName' | 'lastName'>[];
};

export type GetCurrentUserRequest = {};
export type GetCurrentUserResponse = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'isAdmin' | 'subscribed'
>;
export interface deactivateUserRequest {
  id: string;
}
export type deactivateUserResponse = {
  message: string;
};

export interface deleteUserRequest {
  id: string;
}
export type deleteUserResponse = {
  message: string;
};

export interface activateUserRequest {
  id: string;
}
export type activateUserResponse = {
  message: string;
};

// course
export type CreateCourseRequest = Pick<
  Course,
  'id' | 'title' | 'description' | 'userId'
>;
export type CreateCourseResponse = Pick<Course, 'id' | 'title' | 'description'>;

export interface GetCourseRequest {
  id: string;
}
export type GetCourseResponse = Pick<Course, 'title'>;

export interface ListCoursesRequest {}
export type ListCoursesResponse = {
  courses: Pick<Course, 'id' | 'title' | 'description'>[];
};
export interface DeleteCourseRequest {
  id: string;
}
export type DeleteCourseResponse = {
  message: string;
};
export type CreateChapterRequest = Pick<
  Chapter,
  'id' | 'title' | 'description' | 'courseId'
>;
export type CreateChapterResponse = Pick<
  Chapter,
  'id' | 'title' | 'description'
>;

export interface GetChapterRequest {
  id: string;
}
export type GetChapterResponse = Pick<Chapter, 'title'>;

export type listChapterRequest = {
  courseId: string;
};

export type listChapterResponse = {
  chapters: Pick<Chapter, 'id' | 'title' | 'description'>[];
};

export interface DeleteChapterRequest {
  id: string;
}
export type DeleteChapterResponse = {
  message: string;
};

export type CreateVideoRequest = Pick<
  Video,
  'id' | 'title' | 'url' | 'chapterId'
>;
export type CreateVideoResponse = Pick<Video, 'id' | 'title' | 'url'>;

export interface GetVideoRequest {
  id: string;
}
export type GetVideoResponse = Pick<Video, 'title' | 'url'>;

export type listVideoRequest = {
  chapterId: string;
};

export type listVideoResponse = {
  videos: Pick<Video, 'title' | 'url'>[];
};

export interface DeleteVideoRequest {
  id: string;
}
export type DeleteVideoResponse = {
  message: string;
};
