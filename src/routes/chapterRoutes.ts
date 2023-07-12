import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createChapterHandler,
  deleteChapterHandler,
  getChapterByIdHandler,
  getChaptersByCourseIdHandler,
} from '../handlers/chapterHandler';
import { userIsAdmin } from '../handlers/authHandler';
import { protect } from '../middleware/authMiddleware';

export const chapterRouter = Router();

chapterRouter.route('/chapters/:id').get(asyncHandler(getChapterByIdHandler));

chapterRouter
  .route('/courses/:courseId/chapters')
  .get(asyncHandler(getChaptersByCourseIdHandler));
chapterRouter
  .route('/chapters/:id')
  .delete(protect, userIsAdmin, asyncHandler(deleteChapterHandler));
chapterRouter
  .route('/courses/:courseId/chapters')
  .post(protect, userIsAdmin, asyncHandler(createChapterHandler));
