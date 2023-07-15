import { ERRORS } from '../shared/errors';
import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { verifyJwt } from '../utils/auth';
import { db } from '../datastore';
import { ExpressHandler, JwtObject } from '../types';

export const enforceJwtMiddleware: ExpressHandler<any, any> = async (
  _,
  res,
  next
) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  return next();
};

export const protect = async (req: any, res: any, next: any) => {
  // 1) Getting token and check of it's there
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
  let decoded: JwtObject;
  try {
    decoded = await verifyJwt(token);
  } catch (e) {
    const verifyErr = e as VerifyErrors;
    if (verifyErr instanceof TokenExpiredError) {
      return res.status(401).send({ error: ERRORS.TOKEN_EXPIRED });
    }
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }
  // 3) Check if user still exists
  const user = await db.getUserById(decoded.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  res.locals.userId = user.id;
  req.user = user;
  next();
};
