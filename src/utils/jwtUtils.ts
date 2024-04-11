import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const expiresIn = '2h';

export const generateToken = (userId: number) => {
  return jwt.sign({ user_id: userId }, JWT_SECRET, { expiresIn });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
