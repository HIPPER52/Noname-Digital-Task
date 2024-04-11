import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const findAllBooks = async () => {
  return await prisma.book.findMany();
};

export const createBook = async (name: string, author: string) => {
  return await prisma.book.create({
    data: { name, author }
  });
};

export const updateBook = async (id: number, name: string, author: string) => {
  return await prisma.book.update({
    where: { id },
    data: { name, author }
  });
};

export const deleteBook = async (id: number) => {
  await prisma.book.delete({
    where: { id }
  });
};
