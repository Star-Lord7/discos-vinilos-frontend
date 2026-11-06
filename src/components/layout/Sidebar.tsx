import { Link, NavLink } from "react-router-dom";

const menuItems = [
  { name: "Resumen", path: "/dashboard", icon: "⌂" },
  { name: "Discos", path: "/dashboard/products", icon: "◉" },
  { name: "Artistas", path: "/dashboard/artists", icon: "♫" },
  { name: "Géneros", path: "/dashboard/genres", icon: "♪" },
  { name: "Categorías", path: "/dashboard/categories", icon: "▤" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-full h-full bg-zinc-950 text-white flex flex-col">
      <div className="px-6 py-7 border-b border-zinc-800">
        <LinkBrand onClose={onClose} />

        <p className="text-xs text-zinc-500 mt-2">Panel de administración</p>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs uppercase tracking-widest text-zinc-500 px-3 mb-3">
          Gestión de la tienda
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`
              }
            >
              <span className="w-6 text-center text-lg">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-6 py-5 border-t border-zinc-800">
        <NavLink
          to="/"
          onClick={onClose}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Volver a la tienda
        </NavLink>
      </div>
    </aside>
  );
}

function LinkBrand({ onClose }: SidebarProps) {
  return (
    <Link to="/dashboard" onClick={onClose} className="text-2xl font-serif">
      VINYL STORE
    </Link>
  );
}
