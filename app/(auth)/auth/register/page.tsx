import Link from "next/link";

import { Button } from "@/src/ui/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { Input } from "@/src/ui/components/Input";
import { Select } from "@/src/ui/components/Select";

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <p className="text-sm text-white">Registra tu perfil para comenzar a explorar oportunidades.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Select
              id="register-role"
              label="Rol"
              options={[
                { label: "Estudiante", value: "student" },
                { label: "Coach", value: "coach" },
              ]}
              defaultValue="student"
            />
            <Input id="register-name" type="text" label="Nombre completo" placeholder="Tu nombre" required />
            <Input id="register-email" type="email" label="Correo electronico" placeholder="tu@correo.com" required />
            <Input id="register-password" type="password" label="Contrasena" placeholder="********" required />
            <Input
              id="register-confirm-password"
              type="password"
              label="Confirmar contrasena"
              placeholder="********"
              required
            />
            <Button type="button" className="w-full">
              Crear cuenta
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
