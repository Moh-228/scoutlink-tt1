import { z } from "zod";

const passwordStrength = z
	.string()
	.min(8, "La contrasena debe tener al menos 8 caracteres.")
	.max(72, "La contrasena no puede exceder 72 caracteres.")
	.regex(/[A-Z]/, "La contrasena debe contener al menos una mayuscula.")
	.regex(/[^a-zA-Z0-9]/, "La contrasena debe contener al menos un simbolo.");

export const registerSchema = z
	.object({
		email: z.string().email("Correo invalido.").trim().toLowerCase(),
		password: passwordStrength,
		role: z.enum(["student", "coach"]).default("student"),
		fullName: z
			.string()
			.min(2, "El nombre debe tener al menos 2 caracteres.")
			.max(120, "El nombre no puede exceder 120 caracteres.")
			.trim(),
	})
	.superRefine((data, ctx) => {
		if (data.role === "student" && !data.email.endsWith("@alumno.ipn.mx")) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Los alumnos deben usar su correo institucional @alumno.ipn.mx.",
				path: ["email"],
			});
		}
	});

export const loginSchema = z.object({
	email: z.string().email("Correo invalido.").trim().toLowerCase(),
	password: z
		.string()
		.min(8, "La contrasena debe tener al menos 8 caracteres.")
		.max(72, "La contrasena no puede exceder 72 caracteres."),
});

export const forgotPasswordSchema = z.object({
	email: z.string().email("Correo invalido.").trim().toLowerCase(),
});

export const resetPasswordSchema = z.object({
	token: z.string().min(1, "Token requerido."),
	password: passwordStrength,
});

const sportEnum = z.enum(["basketball", "soccer", "flag_football", "volleyball"]);

export const studentProfileSchema = z.object({
	fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres.").max(120).trim(),
	birthDate: z.string().optional(),
	school: z.string().max(120).optional(),
	semester: z.coerce.number().int().min(1).max(12).optional().or(z.literal("")),
	gender: z.string().max(50).optional(),
	favoriteSport: sportEnum.optional(),
	socialLink: z.string().url("Debe ser una URL valida.").optional().or(z.literal("")),
});

export const studentGeneralCardSchema = z.object({
	heightCm: z.coerce.number().int().min(50).max(270).optional().or(z.literal("")),
	weightKg: z.coerce.number().int().min(20).max(400).optional().or(z.literal("")),
	phone: z.string().max(20).optional(),
	publicEmail: z.string().email("Correo invalido.").optional().or(z.literal("")),
	experienceLevel: z.enum(["beginner", "intermediate", "advanced"]).optional(),
	isPublic: z.boolean().default(false),
	medicalInfo: z
		.object({
			previousInjuries: z.string().max(500).optional(),
			currentInjury: z.string().max(500).optional(),
			surgeries: z.string().max(300).optional(),
			allergies: z.string().max(300).optional(),
			asthma: z.boolean().optional(),
			medication: z.string().max(300).optional(),
			medicalRestrictions: z.string().max(500).optional(),
		})
		.optional(),
	documents: z
		.object({
			inscriptionProof: z.string().max(500).optional(),
			medicalInsurance: z.string().max(500).optional(),
		})
		.optional(),
});

export const studentSpecializedCardSchema = z.object({
	sport: sportEnum,
	data: z.record(z.string(), z.unknown()).default({}),
});

export const coachProfileSchema = z.object({
	displayName: z.string().min(2, "El nombre debe tener al menos 2 caracteres.").max(120).trim(),
	academicUnit: z.string().max(120).optional(),
	phone: z.string().max(20).optional(),
	bio: z.string().max(1000).optional(),
	sports: z
		.array(sportEnum)
		.min(1, "Selecciona al menos un deporte."),
});

export const coachDocumentsSchema = z.object({
	documents: z
		.array(
			z.object({
				sport: sportEnum,
				documentUrl: z.string().url("Debe ser una URL valida."),
			}),
		)
		.min(1),
});

const categoryGenderEnum = z.enum(["V", "F", "Mixto"]);

export const coachCardSchema = z.object({
	certifications: z.string().max(1000).optional(),
	experience: z.string().max(1000).optional(),
	yearsExperience: z.coerce.number().int().min(0).max(60).optional().or(z.literal("")),
	categories: z.array(categoryGenderEnum).optional(),
	achievements: z.string().max(2000).optional(),
});
