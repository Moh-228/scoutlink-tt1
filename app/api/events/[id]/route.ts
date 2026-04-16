type EventRouteProps = {
	params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: EventRouteProps) {
	const { id } = await params;

	return Response.json(
		{
			ok: false,
			data: null,
			message: `Prototipo UI: detalle real no disponible para ${id}.`,
		},
		{ status: 501 },
	);
}
