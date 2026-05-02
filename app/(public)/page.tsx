
import Link from "next/link";

import { buttonClassNames } from "@/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";

const HOW_IT_WORKS = [
  {
    title: "1. Crea tu perfil",
    description: "Completa datos académicos y deportivos para destacar ante entrenadores.",
  },
  {
    title: "2. Descubre eventos",
    description: "Filtra oportunidades por deporte, formato y fecha.",
  },
  {
    title: "3. Postulate y da seguimiento",
    description: "Monitorea tus estados y avanza en el proceso de reclutamiento.",
  },
];

const SPORTS = [
  { name: "Fútbol", description: "Visorías y tryouts." },
  { name: "Básquetbol", description: "Eventos de scouting técnico y físico." },
  { name: "Tocho bandera", description: "Visorías y tryouts." },
  { name: "Voleibol", description: "Eventos de scouting técnico y físico." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-3xl bg-[#18181b] p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-xl font-bold uppercase tracking-[0.3em] text-[#1883FF]">Scoutlink</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Conecta talento estudiantil con oportunidades reales de reclutamiento universitario.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white">
          Un espacio para que estudiantes deportistas muestren su perfil, postulen a eventos y reciban seguimiento de entrenadores.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/login" className={buttonClassNames("primary", "w-full sm:w-auto")}>
            Iniciar sesión
          </Link>
          <Link href="/auth/register" className={buttonClassNames("secondary", "w-full sm:w-auto")}>
            Registrarme
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Cómo funciona</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((step) => (
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
        <h2 className="text-2xl font-semibold tracking-tight text-white">Deportes</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPORTS.map((sport) => (
            <Card key={sport.name}>
              <CardHeader>
                <CardTitle>{sport.name}</CardTitle>
                <CardDescription>{sport.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-sm text-white">
        <p>Scoutlink - Prototipo UI 2026</p>
      </footer>
    </main>
  );
}
