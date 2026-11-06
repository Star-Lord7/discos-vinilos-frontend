import { Link } from "react-router-dom";
import type { Product } from "../../interface/product.interface";
import { getProductImageUrl } from "../../utils/productImage";

export default function ProductCard({ products }: { products: Product }) {
  const primaryImage =
    products.images?.find((image) => image.isPrimary) ?? products.images?.[0];

  const imageUrl = getProductImageUrl(primaryImage?.url);
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 group">
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

      <div className="p-6">
        <h3 className="text-lg font-semibold text-zinc-900">{products.name}</h3>
        <p className="text-zinc-500 mt-2">{products.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-zinc-900 font-bold">${products.price}</span>
          <Link
            to={`/products/${products.id}`}
            className="bg-zinc-900 text-white px-5 py-2 rounded-full hover:bg-orange-600 duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
