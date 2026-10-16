import ProductGrid from "../product/ProductGrid";

import useCategoryProducts from "../../hooks/useCategoryProducts";

interface CategoryProductsProps {
  categoryId: string | null;
}

export default function CategoryProducts({
  categoryId,
}: CategoryProductsProps) {
  const { products, loading, error } = useCategoryProducts(categoryId);

  if (!categoryId) {
    return (
      <div className="flex items-center justify-center min-h-96 border border-dashed border-zinc-300 rounded-xl">
        <p className="text-zinc-500">
          Selecciona una categoría para ver sus discos
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-zinc-500">Cargando discos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-zinc-500">
          Esta categoría no tiene discos disponibles.
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
