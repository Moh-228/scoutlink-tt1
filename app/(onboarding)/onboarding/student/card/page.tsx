"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

const LEVEL_OPTIONS = [
  { label: "Selecciona tu nivel (opcional)", value: "" },
  { label: "Principiante", value: "beginner" },
  { label: "Intermedio", value: "intermediate" },
  { label: "Avanzado", value: "advanced" },
];

async function completeOnboarding() {
  await fetch("/api/onboarding/complete", { method: "POST" });
}

export default function StudentCardPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const fd = new FormData(event.currentTarget);

    const body = {
      heightCm: String(fd.get("heightCm") ?? ""),
      weightKg: String(fd.get("weightKg") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      publicEmail: String(fd.get("publicEmail") ?? ""),
      experienceLevel: String(fd.get("experienceLevel") ?? "") || undefined,
      isPublic: fd.get("isPublic") === "on",
    };

    try {
      const res = await fetch("/api/onboarding/student/card", {
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

      router.push("/onboarding/student/specialized");
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
          Paso 2 de 3 — Opcional
        </div>
        <CardTitle>Ficha deportiva general</CardTitle>
        <p className="text-sm text-white/70">
          Esta informacion ayuda a los entrenadores a encontrarte. Puedes completarla despues.
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input id="ob-height" name="heightCm" type="number" min={50} max={270} label="Estatura (cm)" placeholder="175" />
            <Input id="ob-weight" name="weightKg" type="number" min={20} max={400} label="Peso (kg)" placeholder="70" />
          </div>
          <Input id="ob-phone" name="phone" type="tel" label="Telefono de contacto" placeholder="+52 55..." />
          <Input id="ob-pub-email" name="publicEmail" type="email" label="Correo publico (opcional)" placeholder="tu@correo.com" />
          <Select
            id="ob-level"
            name="experienceLevel"
            label="Nivel de experiencia"
            options={LEVEL_OPTIONS}
          />
          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-white">
            <input type="checkbox" name="isPublic" className="h-4 w-4 rounded border-slate-300" />
            Hacer mi ficha visible para entrenadores
          </label>

          {error ? (
            <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar y continuar"}
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
