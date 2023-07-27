import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {protect} from "../middleware/authMiddleware";
import {UserIsSubscribed} from "../handlers/userHandler";
import {AddResultHandler, getExamResultsHandler, getUserResultsHandler} from "../handlers/resultsHandler";
import {userIsAdmin} from "../handlers/authHandler";

export const resultsRouter = Router();

resultsRouter
    .route('/exams/:examId/result')
    .post(protect ,UserIsSubscribed, asyncHandler(AddResultHandler));

// get all results of a user
resultsRouter
    .route('/users/:userId/results')
    .get(protect ,UserIsSubscribed, asyncHandler(getUserResultsHandler));
// get results for a user for a specific exam
resultsRouter
    .route('/exams/:examId/results')
    .get(protect ,userIsAdmin, asyncHandler(getExamResultsHandler));