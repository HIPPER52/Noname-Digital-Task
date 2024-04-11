import { Request, Response, NextFunction } from 'express';
import * as jwtUtils from '../utils/jwtUtils';
import { Request as AuthRequest } from '../types';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'Token is required for authentication' });
  }
  try {
    const decoded = jwtUtils.verifyToken(token);
    if (typeof decoded === 'string' || !decoded.user_id) {
      throw new Error('Invalid token');
    }
    req.user = { user_id: decoded.user_id };
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  next();
};
