import { Badge } from "@/components/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { mockPlayerCards } from "@/mock/fichas";

function sportColor(sport: string) {
  switch (sport) {
    case "Basquetbol":
      return "bg-orange-100 text-orange-800";
    case "Futbol Soccer":
      return "bg-green-100 text-green-800";
    case "Tocho Bandera":
      return "bg-red-100 text-red-800";
    case "Voleibol":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function FichasPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Fichas de deportistas</h1>
        <p className="text-slate-600">Directorio publico de fichas resumidas con filtros visuales.</p>
      </header>

      <Card>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input id="ficha-search" label="Buscar por nombre" placeholder="Nombre del jugador" />
          <Select
            id="ficha-sport"
            label="Deporte"
            defaultValue="all"
            options={[
              { label: "Todos", value: "all" },
              { label: "Basquetbol", value: "basquetbol" },
              { label: "Futbol Soccer", value: "futbol" },
              { label: "Tocho Bandera", value: "tocho" },
              { label: "Voleibol", value: "voleibol" },
            ]}
          />
          <Select
            id="ficha-school"
            label="Escuela"
            defaultValue="all"
            options={[
              { label: "Todas", value: "all" },
              { label: "ESIME", value: "esime" },
              { label: "ESCOM", value: "escom" },
              { label: "UPIITA", value: "upiita" },
              { label: "UPIBI", value: "upibi" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {mockPlayerCards.map((player) => (
          <Card key={player.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{player.name}</CardTitle>
                <Badge className={sportColor(player.sport)}>{player.sport}</Badge>
              </div>
              <CardDescription>{player.school}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>Edad: {player.age}</p>
              <p>Posicion: {player.position}</p>
              <p>Nivel: {player.level}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
