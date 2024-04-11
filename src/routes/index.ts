import { Router } from 'express';
import * as booksController from '../controllers/booksController';
import * as authController from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

router.get('/auth/token', authController.generateToken);

router.get('/books', booksController.getAllBooks);
router.post('/books', verifyToken, booksController.createBook);
router.put('/books/:id', verifyToken, booksController.updateBook);
router.delete('/books/:id', verifyToken, booksController.deleteBook);

export default router;
