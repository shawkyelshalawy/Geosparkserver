import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createCourseHandler,
  deleteCourseHandler,
  getAllCoursesHandler,
  getCourseHandler,
} from '../handlers/courseHandler';
import { protect } from '../middleware/authMiddleware';
import { userIsAdmin } from '../handlers/authHandler';
export const courseRouter = Router();
courseRouter.route('/courses').get(asyncHandler(getAllCoursesHandler));
courseRouter.route('/courses/:id').get(asyncHandler(getCourseHandler));
courseRouter
  .route('/courses')
  .post(protect, userIsAdmin, asyncHandler(createCourseHandler));
courseRouter
  .route('/courses/:id')
  .delete(protect, userIsAdmin, asyncHandler(deleteCourseHandler));
