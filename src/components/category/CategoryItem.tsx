import type { Category } from "../../interface/category.interface";

interface CategoryItemProps {
  category: Category;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryItem({
  category,
  selected,
  onClick,
}: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-6 py-5 border-b border-zinc-200 transition ${
        selected ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-800"
      }`}
    >
      <p className="font-serif text-2xl">{category.name}</p>

      <p
        className={`text-base mt-2 ${
          selected ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {category.description}
      </p>
    </button>
  );
}
