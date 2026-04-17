import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email("Correo invalido.").trim().toLowerCase(),
	password: z
		.string()
		.min(8, "La contrasena debe tener al menos 8 caracteres.")
		.max(72, "La contrasena no puede exceder 72 caracteres."),
	role: z.enum(["student", "coach"]).default("student"),
	fullName: z
		.string()
		.min(2, "El nombre debe tener al menos 2 caracteres.")
		.max(120, "El nombre no puede exceder 120 caracteres.")
		.trim(),
});

export const loginSchema = z.object({
	email: z.string().email("Correo invalido.").trim().toLowerCase(),
	password: z
		.string()
		.min(8, "La contrasena debe tener al menos 8 caracteres.")
		.max(72, "La contrasena no puede exceder 72 caracteres."),
});
