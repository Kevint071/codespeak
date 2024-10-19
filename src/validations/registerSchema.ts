import { z } from "zod";

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(4, { message: "El nombre debe tener al menos 4 caracteres" })
			.max(60, { message: "El nombre no puede tener más de 60 caracteres" }),
		username: z
			.string()
			.min(2, { message: "El nombre de usuario debe tener al menos 2 caracteres" })
			.max(50, { message: "El nombre de usuario no puede tener más de 50 caracteres" })
			.refine((val) => !val.includes(" "), {
				message: "El nombre de usuario no puede contener espacios",
			}),
		email: z.string().email({ message: "El email no es válido" }),
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
