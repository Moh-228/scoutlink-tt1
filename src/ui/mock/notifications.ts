export type NotificationType = "evento" | "postulacion" | "contacto";

export type AppNotification = {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  date: string;
  unread: boolean;
};

export const mockNotifications: AppNotification[] = [
  {
    id: "nt-001",
    title: "Nuevo torneo publicado",
    description: "Se publico el Torneo Inter-ES de Basquetbol 2026.",
    type: "evento",
    date: "2026-04-14",
    unread: true,
  },
  {
    id: "nt-002",
    title: "Actualizacion de postulacion",
    description: "Tu estatus paso a preseleccionado en Tryout Regional de Futbol.",
    type: "postulacion",
    date: "2026-04-13",
    unread: true,
  },
  {
    id: "nt-003",
    title: "Coach desea contactarte",
    description: "Se habilito contacto por correo para evento de reclutamiento.",
    type: "contacto",
    date: "2026-04-11",
    unread: false,
  },
];
