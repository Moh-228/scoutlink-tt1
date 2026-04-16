import { SidebarNav } from "@/src/ui/components/SidebarNav";
import { Topbar } from "@/src/ui/components/Topbar";
import { mockUser } from "@/src/ui/mock/user";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-white px-4 py-5 lg:border-b-0 lg:border-r lg:px-5">
        <p className="mb-6 text-xl font-bold text-slate-900">Scoutlink</p>
        <SidebarNav role={mockUser.role} />
      </aside>
      <div className="flex min-h-screen flex-col">
        <Topbar userName={mockUser.name} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
