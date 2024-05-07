import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const booksSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  featured: z.boolean().optional().default(true),
  cover_image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png formats are supported")
    .optional()
    .or(z.literal("")),
  author: z.string().min(1, { message: "Author is required" }),
  isbn: z.string().min(1, { message: "ISBN is required" }),
  category: z.string().min(1, { message: "category is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export type BooksType = z.infer<typeof booksSchema>;
export interface Books {
  id: number;
  title: string;
  featured: boolean;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover_image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface Book {
  id: number;
  title: string;
  featured: boolean;
  author: string;
  isbn: string;
  category: string;
  description: string;
  cover_image: string;
}
