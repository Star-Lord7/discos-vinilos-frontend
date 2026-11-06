import { useState } from "react";
import ProductForm from "../../components/product/ProductForm";
import useProducts from "../../hooks/useProducts";
import { getProductImageUrl } from "../../utils/productImage";

export default function Products() {
  const { products, loading, error, reload } = useProducts();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm uppercase tracking-widest text-orange-600">
            Administración
          </p>

          <h1 className="text-4xl font-serif text-zinc-900 mt-2">
            Gestión de discos
          </h1>

          <p className="text-zinc-500 mt-3">
            Consulta y administra los discos de Vinyl Store.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white px-5 py-3 rounded-lg hover:bg-orange-700 transition"
        >
          + Agregar disco
        </button>
      </div>

      {/* Resumen */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-6">
        <p className="text-sm text-zinc-500">Discos registrados</p>

        <p className="text-3xl font-semibold text-zinc-900 mt-2">
          {loading ? "..." : products.length}
        </p>
      </div>

      {/* Estados de la petición */}
      {loading && (
        <div className="bg-white rounded-xl p-8 text-center text-zinc-500">
          Cargando discos desde la base de datos...
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700">
          <p className="font-semibold">No se pudieron cargar los discos.</p>
          <p className="text-sm mt-2">{error}</p>
          <p className="text-sm mt-2">
            Verifica que el backend esté ejecutándose y que la API responda
            correctamente.
          </p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl p-10 text-center">
          <p className="text-lg font-medium text-zinc-800">
            No hay discos registrados
          </p>
          <p className="text-zinc-500 mt-2">
            Cuando existan productos en la base de datos, aparecerán aquí.
          </p>
        </div>
      )}

      {showForm && (
        <div className="bg-white border border-zinc-200 rounded-xl p-6 md:p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-serif text-zinc-900">
              Registrar nuevo disco
            </h2>
            <p className="text-zinc-500 mt-2">
              Completa la información del producto.
            </p>
          </div>

          <ProductForm
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              void reload();
            }}
          />
        </div>
      )}

      {/* Tabla de productos */}
      {!loading && !error && products.length > 0 && (
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Disco
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Álbum
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Año
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Formato
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Precio
                  </th>
                  <th className="px-5 py-4 text-sm font-semibold text-zinc-600">
                    Existencias
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100">
                {products.map((product) => {
                  const primaryImage =
                    product.images?.find((image) => image.isPrimary) ??
                    product.images?.[0];

                  const imageUrl = getProductImageUrl(primaryImage?.url);

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      {/* Nombre del disco e imagen */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={`Portada de ${product.album}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 text-center">
                                Sin foto
                              </div>
                            )}
                          </div>

                          <span className="font-medium text-zinc-900">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      {/* Álbum */}
                      <td className="px-5 py-4 text-zinc-600">
                        {product.album}
                      </td>

                      {/* Año */}
                      <td className="px-5 py-4 text-zinc-600">
                        {product.year}
                      </td>

                      {/* Formato */}
                      <td className="px-5 py-4 text-zinc-600">
                        {product.format}
                      </td>

                      {/* Precio */}
                      <td className="px-5 py-4 font-medium text-zinc-900">
                        $
                        {Number(product.price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      {/* Existencias */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm ${
                            product.stock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-zinc-200 px-5 py-4 text-sm text-zinc-500">
            Total de registros: {products.length}
          </div>
        </div>
      )}
    </div>
  );
}
