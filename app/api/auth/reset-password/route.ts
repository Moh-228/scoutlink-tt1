import { hash } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validations";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsed = resetPasswordSchema.safeParse(body);

		if (!parsed.success) {
			return Response.json(
				{ ok: false, message: "Datos invalidos.", errors: parsed.error.flatten().fieldErrors },
				{ status: 400 },
			);
		}

		const { token, password } = parsed.data;

		const resetToken = await prisma.passwordResetToken.findUnique({
			where: { token },
			include: { user: { select: { id: true, isActive: true } } },
		});

		if (
			!resetToken ||
			resetToken.usedAt !== null ||
			resetToken.expiresAt < new Date() ||
			!resetToken.user.isActive
		) {
			return Response.json(
				{ ok: false, message: "El enlace es invalido o ha expirado. Solicita uno nuevo." },
				{ status: 400 },
			);
		}

		const passwordHash = await hash(password, 12);

		await prisma.$transaction([
			prisma.user.update({ where: { id: resetToken.userId }, data: { passwordHash } }),
			prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { usedAt: new Date() } }),
		]);

		return Response.json({ ok: true, message: "Contrasena actualizada correctamente. Ya puedes iniciar sesion." });
	} catch {
		return Response.json({ ok: false, message: "No se pudo actualizar la contrasena." }, { status: 500 });
	}
}
