import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Props) {
	const session = await requireAdmin();
	if (!session) {
		return Response.json({ ok: false, message: "Acceso denegado." }, { status: 403 });
	}

	const { id } = await params;

	const card = await prisma.studentGeneralCard.findUnique({ where: { id } });
	if (!card) {
		return Response.json({ ok: false, message: "Ficha no encontrada." }, { status: 404 });
	}

	await prisma.studentGeneralCard.delete({ where: { id } });

	return Response.json({ ok: true, message: "Ficha general eliminada." });
}
