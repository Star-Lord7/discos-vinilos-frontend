import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-serif mb-4">VINYL STORE</h2>

          <p className="text-zinc-400">
            Vintage records for true music lovers.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>

          <ul className="space-y-2 text-zinc-400">
            <li>Home</li>

            <li>Catalog</li>

            <li>Artists</li>

            <li>Genres</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="text-zinc-400">info@vinylstore.com</p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Vinyl Store. Todos los derechos
              reservados.
            </p>

            <Link
              to="/login"
              className="text-sm text-zinc-500 hover:text-orange-600 transition-colors"
            >
              Acceso administrativo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
