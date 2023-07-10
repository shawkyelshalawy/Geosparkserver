import crypto from 'crypto';
import { db } from '../datastore';
import {
  CreateCourseRequest,
  CreateCourseResponse,
  DeleteCourseRequest,
  DeleteCourseResponse,
  GetCourseRequest,
  GetCourseResponse,
} from '../shared/api';
import { ERRORS } from '../shared/errors';
import { Course } from '../shared/types';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
export const createCourseHandler: ExpressHandler<
  CreateCourseRequest,
  CreateCourseResponse
> = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res.status(400).send({ error: ERRORS.Course_Required_Failed });
  }
  const course: Course = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    userId: res.locals.userId,
  };

  await db.CreateCourse(course);
  res.status(200).send(course);
};

export const getCourseHandler: ExpressHandlerWithParams<
  { id: string },
  GetCourseRequest,
  GetCourseResponse
> = async (req, res) => {
  const { id } = req.params;
  const course = await db.getCourseById(id!);
  if (!course) {
    return res.status(404).send({ error: ERRORS.Course_Not_Found });
  }
  return res.status(200).send(course);
};

export const deleteCourseHandler: ExpressHandlerWithParams<
  { id: string },
  DeleteCourseRequest,
  DeleteCourseResponse
> = async (req, res) => {
  const { id } = req.params;
  const course = await db.getCourseById(id!);
  if (!course) {
    return res.status(404).send({ error: ERRORS.Course_Not_Found });
  }
  await db.DeleteCourse(id!);
  return res.status(200).send({ message: 'تم مسح الكورس بنجاح' });
};
