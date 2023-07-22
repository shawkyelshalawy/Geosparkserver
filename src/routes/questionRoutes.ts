import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  AddQuestionHandler,
  checkAnswerHandler,
  getQuestionByIdHandler,
  listExamQuestionsHandler,
} from '../handlers/questionHandler';
import { userIsAdmin } from '../handlers/authHandler';
import { UserIsSubscribed } from '../handlers/userHandler';
import { protect } from '../middleware/authMiddleware';
export const questionRouter = Router();

questionRouter
  .route('/exams/:examId/questions')
  .post(protect, userIsAdmin, asyncHandler(AddQuestionHandler));

questionRouter
  .route('/questions/:questionId')
  .get(protect, UserIsSubscribed, asyncHandler(getQuestionByIdHandler));

questionRouter
  .route('/exams/:examId/questions')
  .get(protect, UserIsSubscribed, asyncHandler(listExamQuestionsHandler));
questionRouter
  .route('/questions/:questionId/check')
  .post(protect, UserIsSubscribed, asyncHandler(checkAnswerHandler));
