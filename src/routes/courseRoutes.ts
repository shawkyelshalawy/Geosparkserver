import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createCourseHandler,
  deleteCourseHandler,
  getAllCoursesHandler,
  getCourseHandler,
} from '../handlers/courseHandler';
import { enforceJwtMiddleware, protect } from '../middleware/authMiddleware';
import { userIsAdmin } from '../handlers/authHandler';
export const courseRouter = Router();
courseRouter.use(asyncHandler(protect)).use(asyncHandler(enforceJwtMiddleware));
courseRouter.route('/courses/:id').get(asyncHandler(getCourseHandler));
courseRouter.route('/courses').get(asyncHandler(getAllCoursesHandler));
courseRouter.use(asyncHandler(userIsAdmin));
courseRouter.route('/courses').post(asyncHandler(createCourseHandler));

courseRouter.route('/courses/:id').delete(asyncHandler(deleteCourseHandler));
