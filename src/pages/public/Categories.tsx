import { useEffect, useState } from "react";

import CategoryList from "../../components/category/CategoryList";
import CategoryProducts from "../../components/category/CategoryProducts";
import CategorySelect from "../../components/category/CategorySelect";
import { getCategories } from "../../services/category";

interface CategoryOption {
  id: string;
  name: string;
}

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const data = await getCategories();

        if (!cancelled) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error cargando categorías:", error);

        if (!cancelled) {
          setError("No se pudieron cargar las categorías.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6">
      {/* Encabezado */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-serif">Categories</h1>

        <p className="text-zinc-500 mt-3">
          Explore our collection by category.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Selector móvil */}
        <div className="lg:hidden">
          {error ? (
            <p className="text-red-600 text-sm">{error}</p>
          ) : (
            <CategorySelect
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              loading={loading}
            />
          )}
        </div>

        {/* Lista lateral de escritorio */}
        <div className="hidden lg:block lg:col-span-1">
          <h2 className="text-xl font-serif mb-5">Categories</h2>

          <CategoryList
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </div>

        {/* Productos */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-serif mb-5">Discos</h2>

          <CategoryProducts categoryId={selectedCategoryId} />
        </div>
      </div>
    </section>
  );
}
