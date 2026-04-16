import { notFound } from "next/navigation";

import { Badge } from "@/src/ui/components/Badge";
import { Button } from "@/src/ui/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { mockEvents } from "@/src/ui/mock/events";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = mockEvents.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">{event.title}</h1>
        <p className="mt-2 text-slate-600">
          {event.sport} - {event.date} - {event.location}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Descripcion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700">{event.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requisitos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {event.requirements.map((requirement) => (
            <Badge key={requirement} variant="info">
              {requirement}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <Button>Postularme</Button>
    </div>
  );
}
