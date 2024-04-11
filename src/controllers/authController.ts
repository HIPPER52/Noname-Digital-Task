import { Request, Response } from 'express';
import * as jwtUtils from '../utils/jwtUtils';

export const generateToken = (req: Request, res: Response) => {
  const token = jwtUtils.generateToken(123);
  res.json({ token });
};
