export async function POST() {
	return Response.json(
		{
			ok: false,
			message: "Prototipo UI: autenticacion deshabilitada.",
		},
		{ status: 501 },
	);
}
