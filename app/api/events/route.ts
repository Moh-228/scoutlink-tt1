export async function GET() {
	return Response.json(
		{
			ok: true,
			data: [],
			message: "Prototipo UI: usa datos mock en frontend.",
		},
		{ status: 200 },
	);
}
