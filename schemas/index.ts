import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
