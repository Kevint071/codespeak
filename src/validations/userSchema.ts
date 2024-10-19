import { z } from "zod";

const genders = ["masculino", "femenino", "otro"] as const;

export type Genders = (typeof genders)[number];

export const mappedGenders: { [key in Genders]: string } = {
	masculino: "Masculino",
	femenino: "Femenino",
	otro: "Prefiero no decirlo",
};

export const userSchema = z.object({
	name: z
		.string()
		.min(4, {
			message: "El nombre debe tener al menos 4 caracteres",
		})
		.max(60, {
			message: "El nombre no puede tener más de 60 caracteres",
		}),
	username: z
		.string()
		.min(2)
		.max(50)
		.refine((val) => !val.includes(" "), {
			message: "El nombre de usuario no puede contener espacios",
		}),
	aboutMe: z
		.string()
		.min(10, {
			message: "La descripción de ti debe tener al menos 10 caracteres",
		})
		.max(500, {
			message: "La descripción de ti no puede tener más de 500 caracteres",
		})
		.optional(),
	gender: z
		.string()
		.refine((val) => genders.includes(val as Genders), {
			message: "Género inválido",
		})
		.optional(),
	birthdate: z
		.string()
		.transform((str) => (str ? new Date(str) : null))
		.refine((date) => !date || date > new Date("1900-01-01"), {
			message: "La fecha debe ser posterior a 1900-01-01",
		})
		.nullable()
		.optional(),
});
