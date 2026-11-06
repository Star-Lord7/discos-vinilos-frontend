import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/layout/Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-zinc-100">
      {/* Sidebar fijo en computadora */}
      <aside className="hidden md:block w-64 shrink-0 h-full">
        <Sidebar />
      </aside>

      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Fondo oscuro */}
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 w-full h-full bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Menú lateral */}
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />

            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
              className="absolute top-5 right-4 p-2 rounded-lg text-white hover:bg-zinc-800"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Contenedor principal */}
      <div className="flex flex-1 min-w-0 flex-col h-full">
        {/* Encabezado móvil */}
        <header className="md:hidden flex items-center justify-between bg-zinc-950 text-white px-4 h-16 shrink-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={sidebarOpen}
            className="p-2 rounded-lg hover:bg-zinc-800"
          >
            <Menu size={26} />
          </button>

          <span className="font-serif text-lg tracking-widest">
            VINYL STORE
          </span>

          <span className="w-10" />
        </header>

        {/* Contenido con scroll independiente */}
        <main className="flex-1 min-h-0 min-w-0 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
