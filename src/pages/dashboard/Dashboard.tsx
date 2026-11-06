import { Link } from "react-router-dom";

const sections = [
  {
    title: "Discos",
    description:
      "Administra los productos de la tienda, sus precios y existencias.",
    path: "/dashboard/products",
    icon: "◉",
  },
  {
    title: "Artistas",
    description: "Agrega nuevos artistas y actualiza su información.",
    path: "/dashboard/artists",
    icon: "♫",
  },
  {
    title: "Géneros",
    description: "Organiza los discos según su género musical.",
    path: "/dashboard/genres",
    icon: "♪",
  },
  {
    title: "Categorías",
    description: "Organiza y administra las categorías del catálogo.",
    path: "/dashboard/categories",
    icon: "▤",
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-orange-600">
          Panel de control
        </p>

        <h1 className="text-4xl font-serif text-zinc-900 mt-3">
          ¡Bienvenido a Vinyl Store!
        </h1>

        <p className="text-zinc-500 mt-3">
          Selecciona una sección para comenzar a administrar tu tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="bg-white border border-zinc-200 rounded-2xl p-6 hover:border-orange-500 hover:shadow-lg transition-all group"
          >
            <span className="text-3xl text-orange-600">{section.icon}</span>

            <h2 className="text-2xl font-serif text-zinc-900 mt-6 group-hover:text-orange-600 transition-colors">
              {section.title}
            </h2>

            <p className="text-zinc-500 mt-3 leading-relaxed">
              {section.description}
            </p>

            <p className="text-sm font-medium text-zinc-900 mt-6">
              Administrar →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
