import * as z from "zod";

export const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
};

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "name must be more than one character")
      .max(15, "Name must be less than 15 characters"),
    email: z
      .string()
      .min(1, "email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Password must be at least eight characters, at least one uppercase, one lowercase, one number and one special character",
      ),
    rePassword: z.string().min(1, "Confirm password is required"),
    phone: z
      .string()
      .regex(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/, "Invalid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
