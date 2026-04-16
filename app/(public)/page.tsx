
import Link from "next/link";

import { buttonClassNames } from "@/src/ui/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { landingHowItWorks, landingSports } from "@/src/ui/mock/dashboard";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Scoutlink</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Conecta talento estudiantil con oportunidades reales de reclutamiento universitario.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Un espacio para que estudiantes deportistas muestren su perfil, postulen a eventos y reciban seguimiento de coaches.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/login" className={buttonClassNames("primary", "w-full sm:w-auto")}>
            Iniciar sesion
          </Link>
          <Link href="/auth/register" className={buttonClassNames("secondary", "w-full sm:w-auto")}>
            Registrarme
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Como funciona</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {landingHowItWorks.map((step) => (
            <Card key={step.title}>
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Deportes</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {landingSports.map((sport) => (
            <Card key={sport.name}>
              <CardHeader>
                <CardTitle>{sport.name}</CardTitle>
                <CardDescription>{sport.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">{sport.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-sm text-slate-600">
        <p>Scoutlink - Prototipo UI 2026</p>
      </footer>
    </main>
  );
}
