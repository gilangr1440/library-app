import { z } from "zod";

type book = {
  cover_image: string | undefined;
  id: number | undefined;
  title: string | undefined;
};

type user = {
  full_name: string | undefined;
  id: number | undefined;
};

export interface Borrows {
  book: book;
  borrow_date: string;
  due_date: string;
  id: number;
  return_date: string;
  user: user;
}

export interface BorrowCartType {
  cover_image: string | undefined;
  id: number | undefined;
  title: string | undefined;
}

export interface BorrowAddType {
  bookId: number[];
  borrow_date: string;
}

export const borrowSchema = z.object({
  borrow_date: z.string().optional(),
  due_date: z.string().optional(),
  return_date: z.string().optional(),
});

export type BorrowType = z.infer<typeof borrowSchema>;
