import { Badge } from "@/components/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { mockAdminStats, mockCoachVerifications } from "@/mock/admin";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Panel de Administrador</h1>
        <p className="text-slate-600">Vista visual de metricas, verificaciones y moderacion.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockAdminStats.map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-3xl">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Solicitudes de verificacion de entrenadores</CardTitle>
          <CardDescription>Solo vista prototipo, sin acciones reales de backend.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockCoachVerifications.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
              <div>
                <p className="font-semibold text-slate-900">{item.coach}</p>
                <p className="text-sm text-slate-600">Deporte: {item.sport}</p>
              </div>
              <Badge variant="warning">{item.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
