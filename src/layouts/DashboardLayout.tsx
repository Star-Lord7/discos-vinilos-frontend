import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100">
      {/* Sidebar fijo */}
      <aside className="w-64 shrink-0 h-full bg-zinc-900">
        <Sidebar />
      </aside>

      {/* Contenido principal con scroll independiente */}
      <main className="flex-1 min-w-0 h-full overflow-y-auto">
        <div className="p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
