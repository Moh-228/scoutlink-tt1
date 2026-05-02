"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

type DeleteButtonProps = {
  url: string;
  label: string;
};

export function DeleteButton({ url, label }: DeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${label}"? Esta acción es irreversible.`)) return;
    setLoading(true);
    setError(null);
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json() as { ok: boolean; message?: string };
    setLoading(false);
    if (!data.ok) { setError(data.message ?? "Error."); return; }
    startTransition(() => router.refresh());
  }

  return (
    <div>
      <Button
        variant="ghost"
        disabled={loading || pending}
        onClick={handleDelete}
        className="px-3 py-1 text-xs text-red-400 hover:bg-red-500/20"
      >
        {loading ? "..." : "Eliminar"}
      </Button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

type SportLabel = { [key: string]: string };
const sportLabels: SportLabel = {
  basketball: "Básquetbol",
  soccer: "Fútbol",
  flag_football: "Flag Football",
  volleyball: "Voleibol",
};

type Student = { id: string; email: string; studentProfile: { fullName: string } | null };
type Coach = { id: string; email: string; coachProfile: { displayName: string } | null };

export type GeneralCard = {
  id: string;
  heightCm: number | null;
  weightKg: number | null;
  isPublic: boolean;
  student: Student;
};

export type SpecializedCard = {
  id: string;
  sport: string;
  student: Student;
};

export type EventCard = {
  id: string;
  title: string;
  type: string;
  sport: string;
  status: string;
  coach: Coach;
};

export function GeneralCardRow({ card }: { card: GeneralCard }) {
  const name = card.student.studentProfile?.fullName ?? card.student.email;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-400">
          {card.heightCm ? `${card.heightCm} cm` : "—"} · {card.weightKg ? `${card.weightKg} kg` : "—"}
        </p>
        <Badge variant={card.isPublic ? "success" : "neutral"} className="mt-1">
          {card.isPublic ? "Pública" : "Privada"}
        </Badge>
      </div>
      <DeleteButton url={`/api/admin/fichas/student-general/${card.id}`} label={`ficha general de ${name}`} />
    </div>
  );
}

export function SpecializedCardRow({ card }: { card: SpecializedCard }) {
  const name = card.student.studentProfile?.fullName ?? card.student.email;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-400">Deporte: {sportLabels[card.sport] ?? card.sport}</p>
      </div>
      <DeleteButton url={`/api/admin/fichas/student-specialized/${card.id}`} label={`ficha especializada de ${name}`} />
    </div>
  );
}

const eventTypeLabels: Record<string, string> = {
  training: "Entrenamiento",
  tournament: "Torneo",
  recruitment: "Reclutamiento",
};

export function EventRow({ event }: { event: EventCard }) {
  const coachName = event.coach.coachProfile?.displayName ?? event.coach.email;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <p className="font-semibold">{event.title}</p>
        <p className="text-sm text-slate-400">
          {eventTypeLabels[event.type] ?? event.type} · {sportLabels[event.sport] ?? event.sport}
        </p>
        <p className="text-sm text-slate-400">Coach: {coachName}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={event.status === "open" ? "success" : "neutral"}>
          {event.status === "open" ? "Abierto" : "Cerrado"}
        </Badge>
        <DeleteButton url={`/api/admin/fichas/events/${event.id}`} label={event.title} />
      </div>
    </div>
  );
}
