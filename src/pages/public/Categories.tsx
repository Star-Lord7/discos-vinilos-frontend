import { useState } from "react";

import CategoryList from "../../components/category/CategoryList";
import CategoryProducts from "../../components/category/CategoryProducts";

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-serif">Categories</h1>

        <p className="text-zinc-500 mt-3">
          Explore our collection by category.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Categories */}

        <div className="lg:col-span-1">
          <h2 className="text-xl font-serif mb-5">Categories</h2>

          <CategoryList
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </div>

        {/* Products */}

        <div className="lg:col-span-3">
          <h2 className="text-xl font-serif mb-5">Discos</h2>

          <CategoryProducts categoryId={selectedCategoryId} />
        </div>
      </div>
    </section>
  );
}
