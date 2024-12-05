import { z } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "El nombre es obligatorio" })
			.max(40, { message: "El nombre es muy largo" })
			.refine((val) => val.length >= 4 || val.length === 0, {
				message: "El nombre es muy corto",
			}),
		username: z
			.string()
			.min(1, {
				message: "El usuario es obligatorio",
			})
			.max(20, {
				message: "El usuario muy largo",
			})
			.refine((val) => val.length > 4, {
				message: "El usuario es muy corto",
			})
			.refine((val) => !val.includes(" "), {
				message: "El usuario contiene espacios",
			}),
		email: z
			.string()
			.min(1, { message: "El email es obligatorio" })
			.email({ message: "El email no es válido" }),
		password: z
			.string()
			.min(8, { message: "Debe tener al menos 8 caracteres" })
			.refine((val) => /[0-9]/.test(val), {
				message: "Debe tener al menos un número",
			})
			.refine((val) => /[a-z]/.test(val), {
				message: "Debe tener al menos una letra minúscula",
			})
			.refine((val) => /[A-Z]/.test(val), {
				message: "Debe tener al menos una letra mayúscula",
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});