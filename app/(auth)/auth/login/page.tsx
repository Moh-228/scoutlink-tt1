import Link from "next/link";

import { Button } from "@/src/ui/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { Input } from "@/src/ui/components/Input";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Iniciar sesion</CardTitle>
          <p className="text-sm text-white">Accede a tu panel de reclutamiento deportivo.</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input id="login-email" type="email" label="Correo electronico" placeholder="tu@correo.com" required />
            <Input id="login-password" type="password" label="Contrasena" placeholder="********" required />
            <Button type="button" className="w-full">
              Entrar
            </Button>
          </form>
          <p className="mt-4 text-sm text-white">
            Aun no tienes cuenta?{" "}
            <Link href="/auth/register" className="font-semibold text-[#1883FF] hover:text-[#75C3FF]">
              Registrarme
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
