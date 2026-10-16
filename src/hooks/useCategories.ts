import { useEffect, useState } from "react";
import type { Category } from "../interface/category.interface";
import { getCategories } from "../services/category";

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);

        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);

        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
}
