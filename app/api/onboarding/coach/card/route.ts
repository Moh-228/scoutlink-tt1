import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { coachCardSchema } from "@/lib/validations";

export async function PATCH(request: Request) {
	const session = await verifySession();

	if (!session || session.role !== "coach") {
		return Response.json({ ok: false, message: "No autorizado." }, { status: 401 });
	}

	try {
		const body = await request.json();
		const parsed = coachCardSchema.safeParse(body);

		if (!parsed.success) {
			return Response.json(
				{ ok: false, message: "Datos invalidos.", errors: parsed.error.flatten().fieldErrors },
				{ status: 400 },
			);
		}

		await prisma.coachProfile.update({
			where: { userId: session.userId },
			data: {
				certifications: parsed.data.certifications || null,
				experience: parsed.data.experience || null,
			},
		});

		return Response.json({ ok: true });
	} catch {
		return Response.json({ ok: false, message: "No se pudo guardar la ficha." }, { status: 500 });
	}
}
