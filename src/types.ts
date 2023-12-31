// Create generic type and append error prop to the Type T
import { RequestHandler } from 'express';

type WithError<T> = T & { error: string; status: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
export type ExpressHandlerWithMoreParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export interface JwtObject {
  userId: string;
}
