import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { studentSpecializedCardSchema } from "@/lib/validations";

export async function POST(request: Request) {
	const session = await verifySession();

	if (!session || session.role !== "student") {
		return Response.json({ ok: false, message: "No autorizado." }, { status: 401 });
	}

	try {
		const body = await request.json();
		const parsed = studentSpecializedCardSchema.safeParse(body);

		if (!parsed.success) {
			return Response.json(
				{ ok: false, message: "Datos invalidos.", errors: parsed.error.flatten().fieldErrors },
				{ status: 400 },
			);
		}

		const { sport, position, achievements, stats } = parsed.data;

		await prisma.studentSpecializedCard.upsert({
			where: { studentId_sport: { studentId: session.userId, sport } },
			update: { data: { position, achievements, stats } },
			create: { studentId: session.userId, sport, data: { position, achievements, stats } },
		});

		return Response.json({ ok: true });
	} catch {
		return Response.json({ ok: false, message: "No se pudo guardar la ficha." }, { status: 500 });
	}
}
