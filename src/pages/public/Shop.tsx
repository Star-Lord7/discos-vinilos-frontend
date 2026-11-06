import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductGrid from "../../components/product/ProductGrid";
import useProducts from "../../hooks/useProducts";

const PRODUCTS_PER_PAGE = 12;

export default function Shop() {
  const { products, loading, error } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el total de páginas
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Evitar páginas fuera del rango disponible
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));

  // Obtener únicamente los productos de la página actual
  const startIndex = (activePage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6">
      {/* Encabezado */}
      <div className="mb-8 md:mb-12">
        <p className="uppercase tracking-[0.25em] text-orange-600 text-xs sm:text-sm">
          Our Collection
        </p>

        <h1 className="text-4xl md:text-5xl font-serif mt-3">
          Vinyl Collection
        </h1>

        <p className="text-zinc-500 mt-3 max-w-xl">
          Browse our complete catalog of vinyl records.
        </p>
      </div>

      {/* Estados */}
      {loading && <p className="text-zinc-500">Cargando discos...</p>}

      {!loading && error && <p className="text-red-500">{error}</p>}

      {/* Productos */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="text-zinc-500">No hay discos disponibles.</p>
          ) : (
            <>
              {/* Información de resultados */}
              <div className="flex items-center justify-between mb-6 gap-3">
                <p className="text-sm text-zinc-500">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + PRODUCTS_PER_PAGE, products.length)} of{" "}
                  {products.length} records
                </p>

                <p className="text-sm text-zinc-500">
                  Page {activePage} of {totalPages}
                </p>
              </div>

              {/* Cuadrícula */}
              <ProductGrid products={paginatedProducts} />

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-12">
                  <button
                    type="button"
                    onClick={() => changePage(activePage - 1)}
                    disabled={activePage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-300 text-zinc-700 hover:border-orange-600 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => changePage(page)}
                      aria-label={`Página ${page}`}
                      aria-current={activePage === page ? "page" : undefined}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                        activePage === page
                          ? "bg-orange-600 text-white"
                          : "border border-zinc-300 text-zinc-700 hover:border-orange-600 hover:text-orange-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => changePage(activePage + 1)}
                    disabled={activePage === totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-300 text-zinc-700 hover:border-orange-600 hover:text-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    aria-label="Página siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
