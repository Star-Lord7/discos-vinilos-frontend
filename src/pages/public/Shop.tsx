import ProductGrid from "../../components/product/ProductGrid";
import useProducts from "../../hooks/useProducts";

export default function Shop() {
  const { products, loading, error } = useProducts();

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="mb-12">
        <p className="uppercase tracking-[0.25em] text-orange-600 text-sm">
          Our Collection
        </p>

        <h1 className="text-5xl font-serif mt-3">Vinyl Collection</h1>

        <p className="text-zinc-500 mt-3 max-w-xl">
          Browse our complete catalog of vinyl records.
        </p>
      </div>

      {loading && <p className="text-zinc-500">Cargando discos...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && <ProductGrid products={products} />}
    </section>
  );
}
