import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  CreatVideoHandler,
  deleteVideoHandler,
  getVideoByIdHandler,
  getVideosForChapter,
} from '../handlers/videoHandler';
import { protect } from '../middleware/authMiddleware';
import { userIsAdmin } from '../handlers/authHandler';
import { UserIsSubscribed } from '../handlers/userHandler';

export const videoRouter = Router();

videoRouter
  .route('/chapters/:chapterId/videos')
  .get(protect, UserIsSubscribed, asyncHandler(getVideosForChapter));
videoRouter
  .route('/videos/:id')
  .get(protect, UserIsSubscribed, asyncHandler(getVideoByIdHandler));
videoRouter
  .route('/videos/:id')
  .delete(protect, userIsAdmin, asyncHandler(deleteVideoHandler));

videoRouter
  .route('/chapters/:chapterId/videos')
  .post(protect, userIsAdmin, asyncHandler(CreatVideoHandler));
