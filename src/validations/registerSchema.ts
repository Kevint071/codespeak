import { z } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, { message: "El nombre es obligatorio." })
			.max(60, { message: "El nombre no puede tener más de 60 caracteres." })
			.refine((val) => val.length >= 4 || val.length === 0, {
				message: "El nombre debe tener al menos 4 caracteres.",
			}),
		username: z
			.string()
			.min(2, {
				message: "El nombre de usuario debe tener al menos 2 caracteres.",
			})
			.max(50, {
				message: "El nombre de usuario no puede tener más de 50 caracteres.",
			})
			.refine((val) => val.trim() !== "", {
				message: "El nombre de usuario es obligatorio.",
			})
			.refine((val) => !val.includes(" "), {
				message: "El nombre de usuario no puede contener espacios.",
			}),
		email: z
			.string()
			.min(1, { message: "El email es obligatorio" })
			.email({ message: "El email no es válido" }),
		password: z
			.string()
			.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
		confirmPassword: z
			.string()
			.min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});
