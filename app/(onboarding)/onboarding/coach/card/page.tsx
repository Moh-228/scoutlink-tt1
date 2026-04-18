"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

async function completeOnboarding() {
  await fetch("/api/onboarding/complete", { method: "POST" });
}

export default function CoachCardPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const fd = new FormData(event.currentTarget);
    const body = {
      certifications: String(fd.get("certifications") ?? ""),
      experience: String(fd.get("experience") ?? ""),
    };

    try {
      const res = await fetch("/api/onboarding/coach/card", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setError(result.message || "No se pudo guardar la ficha.");
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
        <CardTitle>Ficha de entrenador</CardTitle>
        <p className="text-sm text-white/70">
          Comparte tu trayectoria y certificaciones. Puedes editarlas despues desde tu perfil.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-white">
              <span>Certificaciones</span>
              <textarea
                name="certifications"
                rows={3}
                placeholder="Certificacion FIBA, UEFA, CONADE..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600"
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-white">
              <span>Experiencia</span>
              <textarea
                name="experience"
                rows={4}
                placeholder="Describe tu experiencia como entrenador, equipos, logros..."
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
