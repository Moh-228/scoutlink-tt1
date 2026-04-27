import Link from "next/link";
import { redirect } from "next/navigation";

import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const TYPE_LABELS: Record<string, string> = {
  tournament: "Torneo",
  training: "Entrenamiento",
  recruitment: "Reclutamiento",
};

export default async function FavoritesPage() {
  const session = await verifySession();
  if (!session) redirect("/auth/login");

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.userId, targetType: "event" },
    orderBy: { createdAt: "desc" },
  });

  const eventIds = favorites.map((f) => f.targetId);
  const events =
    eventIds.length > 0
      ? await prisma.event.findMany({
          where: { id: { in: eventIds } },
          include: {
            coach: { select: { coachProfile: { select: { displayName: true } } } },
          },
        })
      : [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Favoritos</h1>
        <p className="text-white/60">Eventos que marcaste como favoritos.</p>
      </header>

      {events.length === 0 ? (
        <p className="text-center text-white/40 py-12">No tienes favoritos aún.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-1">
                  <Badge variant="info">{TYPE_LABELS[event.type] ?? event.type}</Badge>
                  <Badge variant={event.status === "open" ? "success" : "danger"}>
                    {event.status === "open" ? "Abierto" : "Cerrado"}
                  </Badge>
                </div>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/dashboard/events/${event.id}`}
                  className="text-sm font-semibold text-[#1883ff] hover:underline"
                >
                  Ver detalle
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
