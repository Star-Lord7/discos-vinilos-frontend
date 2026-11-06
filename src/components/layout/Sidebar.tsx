import { Link, NavLink } from "react-router-dom";

const menuItems = [
  { name: "Resumen", path: "/dashboard", icon: "⌂" },
  { name: "Discos", path: "/dashboard/products", icon: "◉" },
  { name: "Artistas", path: "/dashboard/artists", icon: "♫" },
  { name: "Géneros", path: "/dashboard/genres", icon: "♪" },
  { name: "Categorías", path: "/dashboard/categories", icon: "▤" },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-64 shrink-0 bg-zinc-950 text-white md:min-h-screen">
      <div className="px-6 py-7 border-b border-zinc-800">
        <LinkBrand />

        <p className="text-xs text-zinc-500 mt-2">Panel de administración</p>
      </div>

      <nav className="p-4">
        <p className="text-xs uppercase tracking-widest text-zinc-500 px-3 mb-3">
          Gestión de la tienda
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
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

      <div className="px-6 py-5 border-t border-zinc-800 md:mt-8">
        <NavLink
          to="/"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          ← Volver a la tienda
        </NavLink>
      </div>
    </aside>
  );
}

function LinkBrand() {
  return (
    <Link to="/dashboard" className="text-2xl font-serif">
      VINYL STORE
    </Link>
  );
}
