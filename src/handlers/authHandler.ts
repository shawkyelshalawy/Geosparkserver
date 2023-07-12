import { ExpressHandler } from '../types';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../shared/api';
import { db } from '../datastore';
import { signJwt, verifyJwt } from '../utils/auth';
import { ERRORS } from '../shared/errors';
import { User } from '../shared/types';
import crypto from 'crypto';

export const createSendToken = (user: User, statusCode: number, res: any) => {
  const token = signJwt({ userId: user.id });
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN || '0') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: 'none',
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined!;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
export const signInHandler: ExpressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400);
  }

  const existing = await db.getUserByEmail(email);
  if (!existing || existing.password !== hashPassword(password)) {
    return res.sendStatus(403);
  }

  createSendToken(existing, 200, res);
};

//check if user isAdmin property is true or not
export const userIsAdmin = async (req: any, res: any, next: any) => {
  if (req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send({ error: ERRORS.NOT_ADMIN });
  }
};
export const signUpHandler: ExpressHandler<
  SignUpRequest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: ERRORS.USER_REQUIRED_FIELDS });
  }

  if (await db.getUserByEmail(email)) {
    return res.status(403).send({ error: ERRORS.DUPLICATE_EMAIL });
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    isAdmin: false,
    subscribed: false,
    password: hashPassword(password),
  };
  await db.createUser(user);
  createSendToken(user, 200, res);
};

export const signOutHandler: ExpressHandler<{}, {}> = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send({ status: 'success' });
};

// export const isLoggedIn: ExpressHandler<{}, {}> = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       const decoded = await verifyJwt(req.cookies.jwt);
//       const currentUser = await db.getUserById(decoded.userId);
//       if (!currentUser) {
//         return next();
//       }
//       res.locals.user = currentUser;
//       return next();
//     } catch (e) {
//       return next();
//     }
//   }
//   next();
// };
function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512')
    .toString('hex');
}
