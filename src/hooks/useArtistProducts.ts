import { useEffect, useState } from "react";

import type { Product } from "../interface/product.interface";
import { getProductsByArtist } from "../services/artist";

export default function useArtistProducts(artistId: string | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!artistId) {
        setProducts([]);
        setError(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getProductsByArtist(artistId);

        setProducts(data);
      } catch (error) {
        console.error("Error loading artist products:", error);

        setError("No se pudieron cargar los discos del artista.");

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [artistId]);

  return {
    products,
    loading,
    error,
  };
}
