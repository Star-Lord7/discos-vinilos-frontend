import { useCallback, useEffect, useState } from "react";
import type { Product } from "../interface/product.interface";
import { getProducts } from "../services/product";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial de productos
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (error) {
        console.error("Error loading products:", error);

        if (!cancelled) {
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Recarga manual después de crear, editar o eliminar un disco
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error reloading products:", error);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    reload,
  };
}
