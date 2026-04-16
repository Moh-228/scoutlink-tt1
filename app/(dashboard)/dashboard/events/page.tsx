import Link from "next/link";

import { Button } from "@/src/ui/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { Input } from "@/src/ui/components/Input";
import { Select } from "@/src/ui/components/Select";
import { mockEvents } from "@/src/ui/mock/events";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Eventos</h1>
        <p className="text-slate-600">Explora convocatorias y jornadas de scouting disponibles.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Select
            id="filter-sport"
            label="Deporte"
            options={[
              { label: "Todos", value: "all" },
              { label: "Futbol", value: "futbol" },
              { label: "Basquetbol", value: "basquetbol" },
              { label: "Atletismo", value: "atletismo" },
              { label: "Voleibol", value: "voleibol" },
            ]}
            defaultValue="all"
          />
          <Select
            id="filter-type"
            label="Tipo"
            options={[
              { label: "Todos", value: "all" },
              { label: "Presencial", value: "presencial" },
              { label: "Virtual", value: "virtual" },
            ]}
            defaultValue="all"
          />
          <Input id="filter-date" label="Fecha" type="date" />
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        {mockEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                {event.sport} - {event.type} - {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{event.location}</p>
              <Link href={`/dashboard/events/${event.id}`}>
                <Button variant="secondary">Ver detalle</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
