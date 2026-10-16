import { Link } from "react-router-dom";

import ProductGrid from "./ProductGrid";
import useProducts from "../../hooks/useProducts";

export default function ProductSection() {
  const { products, loading, error } = useProducts();

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-serif text-zinc-900">
            Featured Collection
          </h2>

          <p className="text-zinc-500 mt-2">
            Classic vinyl records selected for collectors.
          </p>
        </div>

        <Link
          to="/products"
          className="border border-zinc-900 px-6 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition"
        >
          View All
        </Link>
      </div>

      {loading && <p className="text-zinc-500">Loading products...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <ProductGrid products={products} />}
    </section>
  );
}
