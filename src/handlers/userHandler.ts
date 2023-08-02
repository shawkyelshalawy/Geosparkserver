import { db } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
import {
  activateUserRequest,
  activateUserResponse,
  deactivateUserRequest,
  deactivateUserResponse,
  deleteUserRequest,
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  ListUsersRequest,
  ListUsersResponse,
} from '../shared/api';
import { verifyJwt } from '../utils/auth';
import { ERRORS } from '../shared/errors';

export const listUsersHandler: ExpressHandler<
  ListUsersRequest,
  ListUsersResponse
> = async (req, res) => {
  const users = await db.getAllUsers();
  return res.status(200).send({
    users: users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      subscribed: user.subscribed,
    })),
  });
};

export const getCurrentUser: ExpressHandler<
  GetCurrentUserRequest,
  GetCurrentUserResponse
> = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).send({ error: ERRORS.NOT_LOGGED_IN });
  }
  // 2) Verification token
  const decoded = await verifyJwt(token);
  if (!decoded) {
    return res.status(401).send({ error: ERRORS.NOT_LOGGED_IN });
  }
  // 3) Check if user still exists
  const user = await db.getUserById(decoded.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }
  return res.send({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    subscribed: user.subscribed,
  });
};

export const deleteUserHandler: ExpressHandlerWithParams<
  { id: string },
  deleteUserRequest,
  deactivateUserResponse
> = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  const user = await db.getUserById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  await db.deleteUser(user.id);
  return res.status(200).send({
    status: 'user deleted successfully',
  });
};
export const activateUserHandler: ExpressHandlerWithParams<
  { id: string },
  activateUserRequest,
  activateUserResponse
> = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  const user = await db.getUserById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  await db.ActivateUser(user.id);
  return res
    .status(200)
    .send({ message: 'user subscription activated successfully' });
};

export const deactivateUserHandler: ExpressHandlerWithParams<
  { id: string },
  deactivateUserRequest,
  deactivateUserResponse
> = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.sendStatus(400);

  const user = await db.getUserById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  await db.DeactivateUser(user.id);
  return res
    .status(200)
    .send({ message: 'user subscription deactivated successfully' });
};

//Check subscription status
export const UserIsSubscribed = async (req: any, res: any, next: any) => {
  if (req.user.subscribed) {
    return next();
  }
  return res.status(403).send({ error: ERRORS.NOT_SUBSCRIBED });
};
