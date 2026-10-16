import CategoryItem from "./CategoryItem";

import useCategories from "../../hooks/useCategories";

interface CategoryListProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryList({
  selectedCategoryId,
  onSelectCategory,
}: CategoryListProps) {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return <p className="text-zinc-500">Cargando categorías...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          selected={selectedCategoryId === category.id}
          onClick={() => onSelectCategory(category.id)}
        />
      ))}
    </div>
  );
}
