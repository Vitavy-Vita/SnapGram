import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Must contain at least 2 characters" })
    .max(50),
  username: z
    .string()
    .min(2, { message: "Must contain at least 2 characters" })
    .max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters" })
    .max(50),
});
export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters" })
    .max(50),
});
export const PostValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(200),
  tags: z.string(),
});
