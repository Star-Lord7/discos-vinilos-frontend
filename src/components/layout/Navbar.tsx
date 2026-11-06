import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Tienda", path: "/products" },
    { name: "Artistas", path: "/artists" },
    { name: "Categorías", path: "/genres" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-orange-600 font-semibold"
      : "text-zinc-800 hover:text-orange-600 transition-colors";

  return (
    <header className="relative bg-stone-100 sticky top-0 z-50 border-b border-stone-200">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 h-20">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-xl sm:text-3xl font-serif font-bold tracking-widest"
        >
          VINYL STORE
        </NavLink>

        {/* Navegación de escritorio */}
        <ul className="hidden md:flex gap-6 lg:gap-10 text-sm uppercase tracking-widest">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* WhatsApp en escritorio */}
        <div className="hidden md:flex gap-5 text-xl">WhatsApp</div>

        {/* Botón hamburguesa */}
        <button
          type="button"
          className="md:hidden p-2 text-zinc-900 hover:text-orange-600 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute top-full left-0 w-full md:hidden bg-stone-100 border-t border-stone-200 shadow-xl"
        >
          <ul className="flex flex-col px-6 py-5 gap-5 text-sm uppercase tracking-widest">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <li className="border-t border-stone-200 pt-4">WhatsApp</li>
          </ul>
        </div>
      )}
    </header>
  );
}
