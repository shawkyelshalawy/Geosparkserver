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
import { protect } from '../middleware/authMiddleware';

export const userRouter = Router();
userRouter.post('/signup', asyncHandler(signUpHandler));
userRouter.post('/login', asyncHandler(signInHandler));
userRouter.get('/logout', asyncHandler(signOutHandler));
userRouter.route('/Currentuser').get(asyncHandler(getCurrentUser));

userRouter
  .route('/Allusers')
  .get(protect, userIsAdmin, asyncHandler(listUsersHandler));

userRouter
  .route('/activate/:id')
  .patch(protect, userIsAdmin, asyncHandler(activateUserHandler));

userRouter
  .route('/deactivate/:id')
  .patch(protect, userIsAdmin, asyncHandler(deactivateUserHandler));
userRouter
  .route('/deleteUser/:id')
  .delete(protect, userIsAdmin, asyncHandler(deleteUserHandler));
