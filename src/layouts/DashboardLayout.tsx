import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-zinc-100 md:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="bg-white border-b border-zinc-200 px-6 md:px-10 py-5">
          <p className="text-sm text-zinc-500">Vinyl Store / Administración</p>
        </header>

        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
