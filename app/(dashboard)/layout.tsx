import { redirect } from "next/navigation";

import { SidebarNav } from "@/components/SidebarNav";
import { Topbar } from "@/components/Topbar";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      email: true,
      role: true,
      studentProfile: { select: { fullName: true } },
      coachProfile: { select: { displayName: true } },
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  const userName = user.studentProfile?.fullName ?? user.coachProfile?.displayName ?? user.email;

  return (
    <div className="min-h-screen bg-[#09090b] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-white bg-[#09090b] px-4 py-5 lg:border-b-0 lg:border-r lg:px-5">
        <p className="mb-6 text-xl font-bold text-[#1883FF]">Scoutlink</p>
        <SidebarNav role={user.role} />
      </aside>
      <div className="flex min-h-screen flex-col">
        <Topbar userName={userName} />
        <main className="flex-1 p-4 text-white sm:p-6 [&_.rounded-2xl]:!border-white/10 [&_.rounded-2xl]:!bg-[#111114] [&_.rounded-2xl]:!ring-white/10 [&_a]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_input]:!bg-white [&_input]:!text-[#1883FF] [&_select]:!bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
