import { Badge } from "@/components/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Select } from "@/components/Select";
import { mockNotifications } from "@/mock/notifications";

const typeLabel = {
  evento: "Evento",
  postulacion: "Postulacion",
  contacto: "Contacto",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Notificaciones</h1>
        <p className="text-slate-600">Avisos in-app sobre eventos, postulaciones y contacto.</p>
      </header>

      <Card>
        <CardContent className="max-w-xs">
          <Select
            id="notifications-filter"
            label="Filtrar por"
            defaultValue="all"
            options={[
              { label: "Todas", value: "all" },
              { label: "Eventos", value: "evento" },
              { label: "Postulaciones", value: "postulacion" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockNotifications.map((notification) => (
          <Card key={notification.id} className={notification.unread ? "ring-cyan-200" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">{notification.title}</CardTitle>
                <Badge variant={notification.unread ? "info" : "neutral"}>{typeLabel[notification.type]}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-700">{notification.description}</p>
              <p className="text-xs text-slate-500">{notification.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
