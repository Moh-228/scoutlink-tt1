import { Input } from "@/components/Input";

type TopbarProps = {
  userName: string;
};

export function Topbar({ userName }: TopbarProps) {
  return (
    <header className="flex flex-col gap-3 border-b border-white/10 bg-[#09090b] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="w-full sm:max-w-sm">
        <Input id="dashboard-search" label="Buscar" placeholder="Eventos, deportes, universidades" />
      </div>
      <div className="flex items-center gap-3 self-end sm:self-auto">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-700 text-sm font-bold text-white"
        >
          {userName.slice(0, 2).toUpperCase()}
        </div>
        <p className="text-sm font-medium text-white">{userName}</p>
      </div>
    </header>
  );
}
