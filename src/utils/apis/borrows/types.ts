import { z } from "zod";

type book = {
  cover_image: string;
  id: number;
  title: string;
};

type user = {
  full_name: string;
  id: number;
};

export interface Borrows {
  book: book;
  borrow_date: string;
  due_date: string;
  id: number;
  return_date: string;
  user: user;
}

export const borrowSchema = z.object({
  borrow_date: z.string().optional(),
  due_date: z.string().optional(),
  return_date: z.string().optional(),
});

export type BorrowType = z.infer<typeof borrowSchema>;
