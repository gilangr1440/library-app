import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const userSchema = z
  .object({
    id: z.number().optional(),
    email: z.string().email("Enter a valid email").min(1, { message: "Enter email" }),
    full_name: z.string().min(1, { message: "Enter your name" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).optional().or(z.literal("")),
    retype_password: z.string().min(6, { message: "Retype password must be at least 6 characters" }).optional().or(z.literal("")),
    phone_number: z.string().min(7, { message: "Phone Number minimum length is 7" }),
    address: z.string().min(1, { message: "Address is required" }),
    profile_picture: z
      .any()
      .optional()
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 5MB")
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png formats are supported")
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.retype_password, {
    message: "Password do not match",
    path: ["retype_password"],
  });

export type IUserType = z.infer<typeof userSchema>;
