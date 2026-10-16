import { useEffect, useState } from "react";
import type { Product } from "../interface/product.interface";
import { getProductsByCategory } from "../services/category";

export default function useCategoryProducts(categoryId: string | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!categoryId) {
        setProducts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getProductsByCategory(categoryId);

        setProducts(data);
      } catch (error) {
        console.error("Error loading category products:", error);

        setError("No se pudieron cargar los discos de esta categoría.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [categoryId]);

  return {
    products,
    loading,
    error,
  };
}
