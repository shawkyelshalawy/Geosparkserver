import { Router } from 'express';
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
  userIsAdmin,
} from '../handlers/authHandler';
import asyncHandler from 'express-async-handler';
import {
  activateUserHandler,
  deactivateUserHandler,
  deleteUserHandler,
  getCurrentUser,
  listUsersHandler,
} from '../handlers/userHandler';
import { createCourseHandler } from '../handlers/courseHandler';
import { protect } from '../middleware/authMiddleware';

export const userRouter = Router();
userRouter.post('/signup', asyncHandler(signUpHandler));
userRouter.post('/login', asyncHandler(signInHandler));
userRouter.get('/logout', asyncHandler(signOutHandler));
userRouter.route('/Currentuser').get(asyncHandler(getCurrentUser));

userRouter.use(asyncHandler(protect)).use(asyncHandler(userIsAdmin));

userRouter.route('/Allusers').get(asyncHandler(listUsersHandler));

userRouter.route('/activate/:id').patch(asyncHandler(activateUserHandler));

userRouter.route('/deactivate/:id').patch(asyncHandler(deactivateUserHandler));
userRouter.route('/deleteUser/:id').delete(asyncHandler(deleteUserHandler));
