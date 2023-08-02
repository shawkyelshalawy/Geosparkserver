import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CheckElgiablityToTakeExam,
  CreatExamHandler,
  deleteExamHandler,
  getAllExamsHandler,
  getExamByIdHandler,
} from '../handlers/examHandler';
import { UserIsSubscribed } from '../handlers/userHandler';
import { protect } from '../middleware/authMiddleware';
import { userIsAdmin } from '../handlers/authHandler';

export const examRouter = Router();

examRouter
  .route('/chapters/:chapterId/exams')
  .post(protect, userIsAdmin, asyncHandler(CreatExamHandler));

examRouter
  .route('/exams/:examId')
  .get(protect, UserIsSubscribed ,CheckElgiablityToTakeExam,  asyncHandler(getExamByIdHandler));

examRouter
  .route('/chapters/:chapterId/exams')
  .get(protect, UserIsSubscribed, asyncHandler(getAllExamsHandler));

examRouter
  .route('/exams/:examId')
  .delete(protect, userIsAdmin, asyncHandler(deleteExamHandler));
