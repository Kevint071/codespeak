import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria" }),
  rememberMe: z.boolean().optional(),
});