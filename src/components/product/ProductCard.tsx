import { Link } from "react-router-dom";
import type { Product } from "../../interface/product.interface";

export default function ProductCard({ products }: { products: Product }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 group">
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1"
          alt=""
          className="h-80 w-full object-cover group-hover:scale-110 duration-500"
        />
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
