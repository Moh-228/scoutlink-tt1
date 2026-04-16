export type FavoriteItem = {
  id: string;
  type: "evento" | "jugador";
  title: string;
  sport: "Basquetbol" | "Futbol Soccer" | "Tocho Bandera" | "Voleibol";
  school: string;
  summary: string;
  href: string;
};

export const mockFavorites: FavoriteItem[] = [
  {
    id: "fav-evt-001",
    type: "evento",
    title: "Tryout de Futbol Soccer - ESCOM",
    sport: "Futbol Soccer",
    school: "ESCOM",
    summary: "Evento de reclutamiento abierto para categoria universitaria.",
    href: "/dashboard/events/evt-001",
  },
  {
    id: "fav-evt-002",
    type: "evento",
    title: "Entrenamiento Intensivo de Voleibol",
    sport: "Voleibol",
    school: "ESIA",
    summary: "Sesion de fundamentos y evaluacion de tecnica por posiciones.",
    href: "/dashboard/events/evt-004",
  },
  {
    id: "fav-ath-001",
    type: "jugador",
    title: "Andrea Ruiz - Armadora",
    sport: "Basquetbol",
    school: "UPIITA",
    summary: "Ficha publica con experiencia en ligas escolares y selectivas.",
    href: "/dashboard/fichas",
  },
];
