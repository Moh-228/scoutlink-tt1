import { SidebarNav } from "@/src/ui/components/SidebarNav";
import { Topbar } from "@/src/ui/components/Topbar";
import { mockUser } from "@/src/ui/mock/user";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#09090b] lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-white bg-[#09090b] px-4 py-5 lg:border-b-0 lg:border-r lg:px-5">
        <p className="mb-6 text-xl font-bold text-[#1883FF]">Scoutlink</p>
        <SidebarNav role={mockUser.role} />
      </aside>
      <div className="flex min-h-screen flex-col">
        <Topbar userName={mockUser.name} />
        <main className="flex-1 p-4 text-white sm:p-6 [&_.rounded-2xl]:!border-white/10 [&_.rounded-2xl]:!bg-[#111114] [&_.rounded-2xl]:!ring-white/10 [&_a]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_input]:!bg-white [&_input]:!text-[#1883FF] [&_select]:!bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}
