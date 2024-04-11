import { Request as ExpressRequest } from 'express';

export interface UserPayload {
  user_id: number;
}

export interface Request extends ExpressRequest {
  user?: UserPayload;
}
