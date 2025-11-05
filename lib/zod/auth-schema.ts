import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Please enter your username.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
})

export const systemAdminSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string().min(1, {
    message: "Please select a role.",
  }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
export type SystemAdminSchemaType = z.infer<typeof systemAdminSchema>
