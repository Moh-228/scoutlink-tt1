"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

const SPORT_OPTIONS = [
  { label: "Selecciona un deporte", value: "" },
  { label: "Basquetbol", value: "basketball" },
  { label: "Futbol", value: "soccer" },
  { label: "Flag Football", value: "flag_football" },
  { label: "Voleibol", value: "volleyball" },
];

async function completeOnboarding() {
  await fetch("/api/onboarding/complete", { method: "POST" });
}

export default function StudentSpecializedPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const fd = new FormData(event.currentTarget);
    const sport = String(fd.get("sport") ?? "");

    if (!sport) {
      setError("Selecciona un deporte para tu ficha especializada.");
      return;
    }

    setIsSubmitting(true);

    const body = {
      sport,
      position: String(fd.get("position") ?? ""),
      achievements: String(fd.get("achievements") ?? ""),
      stats: String(fd.get("stats") ?? ""),
    };

    try {
      const res = await fetch("/api/onboarding/student/specialized", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        const fieldErrors = result.errors ? Object.values(result.errors).flat().join(" ") : "";
        setError(fieldErrors || result.message || "No se pudo guardar la ficha.");
        return;
      }

      await completeOnboarding();
      router.push("/dashboard");
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSkip() {
    await completeOnboarding();
    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/40">
          Paso 3 de 3 — Opcional
        </div>
        <CardTitle>Ficha deportiva especializada</CardTitle>
        <p className="text-sm text-white/70">
          Detalla tu experiencia en un deporte especifico. Puedes agregar mas fichas desde tu perfil.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Select
            id="ob-sp-sport"
            name="sport"
            label="Deporte"
            options={SPORT_OPTIONS}
          />
          <Input id="ob-sp-position" name="position" label="Posicion / rol" placeholder="Base, portero, libero..." />
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-white">
              <span>Logros destacados</span>
              <textarea
                name="achievements"
                rows={3}
                placeholder="Campeonatos, reconocimientos, etc."
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-white">
              <span>Estadisticas o datos relevantes</span>
              <textarea
                name="stats"
                rows={2}
                placeholder="Promedio de puntos, porcentaje de efectividad, etc."
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600"
              />
            </label>
          </div>

          {error ? (
            <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar y finalizar"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleSkip} disabled={isSubmitting}>
              Saltar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
