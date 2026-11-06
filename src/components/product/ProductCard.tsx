import { Link } from "react-router-dom";
import type { Product } from "../../interface/product.interface";
import { getProductImageUrl } from "../../utils/productImage";

export default function ProductCard({ products }: { products: Product }) {
  const primaryImage =
    products.images?.find((image) => image.isPrimary) ?? products.images?.[0];

  const imageUrl = getProductImageUrl(primaryImage?.url);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 group">
      {/* Imagen del disco */}
      <div className="aspect-square w-full overflow-hidden bg-zinc-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portada de ${products.album}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            Sin imagen disponible
          </div>
        )}
      </div>

      {/* Información del disco */}
      <div className="p-3 md:p-6">
        {/* Nombre */}
        <h3 className="text-sm md:text-lg font-semibold text-zinc-900">
          {products.name}
        </h3>

        {/* Artista: solo en teléfono */}
        <p className="text-xs text-zinc-500 mt-1 md:hidden">
          {products.artist.name}
        </p>

        {/* Descripción: solo en PC y tablet */}
        <p className="hidden md:block text-zinc-500 mt-2">
          {products.description}
        </p>

        <div className="flex items-center justify-between mt-3 md:mt-4">
          {/* Precio: solo en PC y tablet */}
          <span className="hidden md:inline text-zinc-900 font-bold">
            ${Number(products.price).toFixed(2)}
          </span>

          {/* Botón de detalles */}
          <Link
            to={`/products/${products.id}`}
            className="w-full md:w-auto text-center bg-zinc-900 text-white px-3 md:px-5 py-2 rounded-full text-xs md:text-base hover:bg-orange-600 duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
