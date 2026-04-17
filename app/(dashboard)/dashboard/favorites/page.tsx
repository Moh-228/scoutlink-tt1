import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { mockFavorites } from "@/mock/favorites";

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

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Favoritos</h1>
        <p className="text-slate-600">Eventos y fichas que marcaste como favoritos.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {mockFavorites.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{item.title}</CardTitle>
                <Badge className={sportColor(item.sport)}>{item.sport}</Badge>
              </div>
              <CardDescription>{item.school}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{item.summary}</p>
              <Link href={item.href} className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">
                Ver mas
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
