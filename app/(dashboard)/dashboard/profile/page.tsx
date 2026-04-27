import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonClassNames } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SPORT_LABELS: Record<string, string> = {
  basketball: "Básquetbol",
  soccer: "Fútbol",
  flag_football: "Flag Football",
  volleyball: "Voleibol",
};

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="grid grid-cols-[160px_1fr] gap-2 text-sm">
      <span className="font-medium text-white/50">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

export default async function ProfilePage() {
  const session = await verifySession();
  if (!session) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      email: true,
      role: true,
      studentProfile: true,
      coachProfile: true,
      generalCard: { select: { heightCm: true, weightKg: true, experienceLevel: true, phone: true, isPublic: true } },
      coachVerifications: { select: { sport: true, status: true } },
    },
  });

  if (!user) redirect("/auth/login");

  const isStudent = user.role === "student";
  const isCoach = user.role === "coach";

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mi perfil</h1>
          <p className="text-white/60">{user.email}</p>
        </div>
        <Link
          href={isStudent ? "/onboarding/student" : isCoach ? "/onboarding/coach" : "#"}
          className={buttonClassNames("secondary")}
        >
          Editar perfil
        </Link>
      </header>

      {isStudent && user.studentProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Perfil estudiantil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Nombre" value={user.studentProfile.fullName} />
            <Row label="Escuela" value={user.studentProfile.school} />
            <Row label="Semestre" value={user.studentProfile.semester} />
            <Row label="Género" value={user.studentProfile.gender} />
            <Row
              label="Deporte favorito"
              value={user.studentProfile.favoriteSport ? SPORT_LABELS[user.studentProfile.favoriteSport] : undefined}
            />
          </CardContent>
        </Card>
      )}

      {isStudent && user.generalCard && (
        <Card>
          <CardHeader>
            <CardTitle>Ficha general</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Estatura" value={user.generalCard.heightCm ? `${user.generalCard.heightCm} cm` : undefined} />
            <Row label="Peso" value={user.generalCard.weightKg ? `${user.generalCard.weightKg} kg` : undefined} />
            <Row label="Nivel" value={user.generalCard.experienceLevel} />
            <Row label="Teléfono" value={user.generalCard.phone} />
            <Row label="Ficha pública" value={user.generalCard.isPublic ? "Sí" : "No"} />
          </CardContent>
        </Card>
      )}

      {isCoach && user.coachProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Perfil de entrenador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Row label="Nombre" value={user.coachProfile.displayName} />
            <Row label="Unidad académica" value={user.coachProfile.academicUnit} />
            <Row label="Teléfono" value={user.coachProfile.phone} />
            <Row label="Bio" value={user.coachProfile.bio} />
            <Row
              label="Deportes"
              value={user.coachProfile.sports.map((s) => SPORT_LABELS[s] ?? s).join(", ")}
            />
            <Row label="Años de experiencia" value={user.coachProfile.yearsExperience} />
          </CardContent>
        </Card>
      )}

      {isCoach && user.coachVerifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user.coachVerifications.map((v) => (
              <Row
                key={v.sport}
                label={SPORT_LABELS[v.sport] ?? v.sport}
                value={v.status === "verified" ? "✓ Verificado" : v.status === "rejected" ? "✗ Rechazado" : "⏳ Pendiente"}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
