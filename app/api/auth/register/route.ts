export async function POST() {
	return Response.json(
		{
			ok: false,
			message: "Prototipo UI: registro deshabilitado.",
		},
		{ status: 501 },
	);
}
