import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 md:pt-4">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-12 text-center md:text-left">
          {/* Información de la tienda */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-serif mb-4">VINYL STORE</h2>

            <p className="text-zinc-400 text-sm md:text-base max-w-xs leading-relaxed">
              Vintage records for true music lovers.
            </p>
          </div>

          {/* Navegación */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>

            <ul className="space-y-3 text-zinc-400 text-sm md:text-base">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="hover:text-orange-600 transition-colors"
                >
                  Catalog
                </Link>
              </li>

              <li>
                <Link
                  to="/artists"
                  className="hover:text-orange-600 transition-colors"
                >
                  Artists
                </Link>
              </li>

              <li>
                <Link
                  to="/genres"
                  className="hover:text-orange-600 transition-colors"
                >
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>

            <a
              href="mailto:info@vinylstore.com"
              className="text-zinc-400 text-sm md:text-base hover:text-orange-600 transition-colors break-all"
            >
              info@vinylstore.com
            </a>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-zinc-800 mt-6 pt-4">
          {/* Información inferior */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-5 text-center md:text-left">
            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed">
              © {new Date().getFullYear()} Vinyl Store. Todos los derechos
              reservados.
            </p>

            <Link
              to="/login"
              className="text-xs md:text-sm text-zinc-500 hover:text-orange-600 transition-colors"
            >
              Acceso administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
