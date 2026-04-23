import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Props) {
	const session = await requireAdmin();
	if (!session) {
		return Response.json({ ok: false, message: "Acceso denegado." }, { status: 403 });
	}

	const { id } = await params;
	const body = await request.json() as { action: "verify" | "reject"; rejectionReason?: string };

	if (body.action !== "verify" && body.action !== "reject") {
		return Response.json({ ok: false, message: "Accion invalida." }, { status: 400 });
	}

	const verification = await prisma.coachVerification.findUnique({ where: { id } });
	if (!verification) {
		return Response.json({ ok: false, message: "Verificacion no encontrada." }, { status: 404 });
	}

	const updated = await prisma.coachVerification.update({
		where: { id },
		data: {
			status: body.action === "verify" ? "verified" : "rejected",
			rejectionReason: body.action === "reject" ? (body.rejectionReason ?? null) : null,
			reviewedBy: session.userId,
			reviewedAt: new Date(),
		},
	});

	return Response.json({ ok: true, data: updated });
}
