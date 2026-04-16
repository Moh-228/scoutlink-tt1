export async function GET() {
	return Response.json(
		{
			ok: false,
			data: null,
			message: "Prototipo UI: usuario actual deshabilitado.",
		},
		{ status: 501 },
	);
}
