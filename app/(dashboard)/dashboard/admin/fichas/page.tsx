import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { GeneralCardRow, SpecializedCardRow, EventRow } from "../_components/FichaRows";

export default async function AdminFichasPage() {
  const [generalCards, specializedCards, events] = await Promise.all([
    prisma.studentGeneralCard.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        heightCm: true,
        weightKg: true,
        isPublic: true,
        student: { select: { id: true, email: true, studentProfile: { select: { fullName: true } } } },
      },
    }),
    prisma.studentSpecializedCard.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        sport: true,
        student: { select: { id: true, email: true, studentProfile: { select: { fullName: true } } } },
      },
    }),
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        type: true,
        sport: true,
        status: true,
        coach: { select: { id: true, email: true, coachProfile: { select: { displayName: true } } } },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Gestion de Fichas</h1>
        <p className="text-slate-400">Administra fichas de deportistas y fichas de torneos/eventos.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Eventos / Fichas de torneos ({events.length})</CardTitle>
          <CardDescription>Todos los eventos creados por coaches. Puedes eliminarlos.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.length === 0 ? (
            <p className="text-sm text-slate-400">Sin eventos registrados.</p>
          ) : (
            events.map((e) => <EventRow key={e.id} event={e} />)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fichas generales de deportistas ({generalCards.length})</CardTitle>
          <CardDescription>Ficha publica/privada de cada deportista.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {generalCards.length === 0 ? (
            <p className="text-sm text-slate-400">Sin fichas generales.</p>
          ) : (
            generalCards.map((c) => <GeneralCardRow key={c.id} card={c} />)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fichas especializadas de deportistas ({specializedCards.length})</CardTitle>
          <CardDescription>Fichas por deporte de cada deportista.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {specializedCards.length === 0 ? (
            <p className="text-sm text-slate-400">Sin fichas especializadas.</p>
          ) : (
            specializedCards.map((c) => <SpecializedCardRow key={c.id} card={c} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
