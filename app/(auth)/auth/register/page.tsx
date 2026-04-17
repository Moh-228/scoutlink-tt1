"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const role = String(formData.get("role") ?? "student");
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, fullName, email, password }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.message ?? "No se pudo completar el registro.");
        return;
      }

      setSuccess("Cuenta creada correctamente. Redirigiendo...");
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <p className="text-sm text-white">Registra tu perfil para comenzar a explorar oportunidades.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Select
              id="register-role"
              name="role"
              label="Rol"
              options={[
                { label: "Estudiante", value: "student" },
                { label: "Coach", value: "coach" },
              ]}
              defaultValue="student"
            />
            <Input id="register-name" name="fullName" type="text" label="Nombre completo" placeholder="Tu nombre" required />
            <Input id="register-email" name="email" type="email" label="Correo electronico" placeholder="tu@correo.com" required />
            <Input id="register-password" name="password" type="password" label="Contrasena" placeholder="********" required />
            <Input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirmar contrasena"
              placeholder="********"
              required
            />
            {error ? (
              <p className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100" role="alert">
                {error}
              </p>
            ) : null}
            {success ? (
              <p className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100" role="status">
                {success}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
          <p className="mt-4 text-sm text-white">
            Ya tienes cuenta?{" "}
            <Link href="/auth/login" className="font-semibold text-[#1883FF] hover:text-[#75C3FF]">
              Iniciar sesion
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
