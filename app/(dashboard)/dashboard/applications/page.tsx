import { Badge } from "@/src/ui/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { mockApplications } from "@/src/ui/mock/applications";

const statusMap = {
  postulado: { label: "Postulado", variant: "info" as const },
  preseleccionado: { label: "Preseleccionado", variant: "warning" as const },
  aceptado: { label: "Aceptado", variant: "success" as const },
  rechazado: { label: "Rechazado", variant: "danger" as const },
};

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Mis postulaciones</h1>
        <p className="text-slate-600">Seguimiento de estados en tus solicitudes.</p>
      </header>

      <div className="space-y-3">
        {mockApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <CardTitle className="text-base">{application.eventTitle}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">Fecha del evento: {application.date}</p>
              <Badge variant={statusMap[application.status].variant}>{statusMap[application.status].label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
