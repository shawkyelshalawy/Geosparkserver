import { RequestHandler } from 'express';
import { Course, User } from './types';

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
