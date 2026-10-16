import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-stone-100 sticky top-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        <h1 className="text-3xl font-serif font-bold tracking-widest">
          VINYL STORE
        </h1>

        <ul className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold"
                  : "hover:text-orange-600 transition-colors"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold"
                  : "hover:text-orange-600 transition-colors"
              }
            >
              Tienda
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/artists"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold"
                  : "hover:text-orange-600 transition-colors"
              }
            >
              Artistas
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/genres"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 font-semibold"
                  : "hover:text-orange-600 transition-colors"
              }
            >
              Categorías
            </NavLink>
          </li>
        </ul>

        <div className="flex gap-5 text-xl">WhatsApp</div>
      </nav>
    </header>
  );
}
