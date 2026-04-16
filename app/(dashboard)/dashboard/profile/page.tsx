import { Button } from "@/src/ui/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/ui/components/Card";
import { Input } from "@/src/ui/components/Input";
import { Select } from "@/src/ui/components/Select";
import { mockUser } from "@/src/ui/mock/user";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Mi perfil</h1>
        <p className="text-slate-600">Actualiza tu informacion personal y deportiva (solo UI).</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Datos generales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input id="profile-name" label="Nombre" defaultValue={mockUser.name} />
          <Input id="profile-email" label="Correo" type="email" defaultValue={mockUser.email} />
          <Input id="profile-university" label="Universidad" defaultValue={mockUser.university} />
          <Input id="profile-city" label="Ciudad" defaultValue={mockUser.city} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias deportivas</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Select
            id="profile-sport"
            label="Deporte principal"
            defaultValue={mockUser.sport.toLowerCase()}
            options={[
              { label: "Futbol", value: "futbol" },
              { label: "Basquetbol", value: "basquetbol" },
              { label: "Atletismo", value: "atletismo" },
              { label: "Voleibol", value: "voleibol" },
            ]}
          />
          <Select
            id="profile-level"
            label="Nivel"
            defaultValue="intermedio"
            options={[
              { label: "Principiante", value: "principiante" },
              { label: "Intermedio", value: "intermedio" },
              { label: "Avanzado", value: "avanzado" },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enlaces y documentos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input id="profile-video" label="Video destacado" placeholder="https://" />
          <Input id="profile-cv" label="Curriculum deportivo" placeholder="https://" />
        </CardContent>
      </Card>

      <Button>Guardar cambios</Button>
    </div>
  );
}
