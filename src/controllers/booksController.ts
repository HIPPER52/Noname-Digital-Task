import { NextFunction, Request, Response } from 'express';
import * as booksService from '../services/booksService';
import { ErrorHandler } from '../utils/errorHandler';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await booksService.findAllBooks();
  res.json(books);
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, author } = req.body;
    if (!name || !author) {
      throw new ErrorHandler(400, 'Name and author are required');
    }
    const book = await booksService.createBook(name, author);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, author } = req.body;
    if (!name || !author) {
      throw new ErrorHandler(400, 'Name and author are required');
    }
    const book = await booksService.updateBook(parseInt(id), name, author);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await booksService.deleteBook(parseInt(id));
    res.status(200).send(`Success deleted book on id: ${id}`);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      res.status(400).send(error.meta.cause);
    } else {
      next(error);
    }
  }
};
