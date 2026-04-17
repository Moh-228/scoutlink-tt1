
import Link from "next/link";

import { buttonClassNames } from "@/src/ui/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { mockMetrics } from "@/src/ui/mock/dashboard";
import { mockEvents } from "@/src/ui/mock/events";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Panel principal</h1>
        <p className="text-white">Resumen rapido de actividad y oportunidades recomendadas.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {mockMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Eventos recomendados</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mockEvents.slice(0, 4).map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {event.sport} - {event.location} - {event.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/events/${event.id}`} className={buttonClassNames("secondary")}>
                  Ver detalle
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}


