import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface FormSelectProps {
  name: string;
  value: string;
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  searchable?: boolean;
}

export default function FormSelect({
  name,
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  searchable = true,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();

  const selectedOption = options.find((option) => option.id === value);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSelect(selectedValue: string) {
    onChange(selectedValue);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Campo oculto para validación required */}
      <input
        type="text"
        name={name}
        value={value}
        onChange={() => {}}
        required
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute w-px h-px opacity-0 pointer-events-none"
      />

      {/* Botón del selector */}
      <button
        type="button"
        id={name}
        disabled={disabled}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${generatedId}-options`}
        className={`w-full flex items-center justify-between gap-3
          rounded-lg border bg-white px-4 py-3 text-left
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${
            open
              ? "border-orange-600 ring-2 ring-orange-100"
              : "border-zinc-300 hover:border-orange-400"
          }`}
      >
        <span
          className={`truncate ${
            selectedOption ? "text-zinc-800" : "text-zinc-500"
          }`}
        >
          {selectedOption?.name ?? placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      {open && !disabled && (
        <div
          id={`${generatedId}-options`}
          role="listbox"
          aria-label={placeholder}
          className="absolute top-full left-0 right-0 mt-2 z-50
            bg-white border border-zinc-200 rounded-xl
            shadow-xl overflow-hidden"
        >
          {/* Buscador */}
          {searchable && (
            <div className="p-3 border-b border-zinc-100">
              <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3">
                <Search size={18} className="text-zinc-400 shrink-0" />

                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="w-full py-3 bg-transparent text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* Opciones */}
          <div className="max-h-60 overflow-y-auto p-2">
            {filteredOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={value === option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full flex items-center justify-between
                  gap-3 px-4 py-3 rounded-lg text-left text-sm
                  transition-colors
                  ${
                    value === option.id
                      ? "bg-orange-50 text-orange-700 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
              >
                <span className="truncate">{option.name}</span>

                {value === option.id && (
                  <Check size={17} className="shrink-0 text-orange-600" />
                )}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <p className="text-center text-sm text-zinc-400 py-6">
                No se encontraron resultados.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
