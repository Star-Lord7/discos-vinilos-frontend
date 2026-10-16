import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../../interface/product.interface";
import { getProductById } from "../../services/product";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-stone-100">
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <img
              src="https://placehold.co/700x700"
              alt={product.name}
              className="rounded-xl shadow-lg"
            />

            <div>
              <h1 className="text-5xl font-serif">{product.name}</h1>

              <h2 className="text-2xl text-zinc-600 mt-2">{product.album}</h2>

              <p className="mt-8 text-zinc-700 leading-8">
                {product.description}
              </p>

              <div className="mt-10 space-y-3">
                <p>
                  <strong>Precio:</strong> ${product.price}
                </p>

                <p>
                  <strong>Artista:</strong> {product.artist.name}
                </p>

                <p>
                  <strong>Categoría:</strong> {product.category.name}
                </p>

                <p>
                  <strong>Género:</strong> {product.genre.name}
                </p>

                <p>
                  <strong>Año:</strong> {product.year}
                </p>

                <p>
                  <strong>Formato:</strong> {product.format}
                </p>

                <p>
                  <strong>Record Label:</strong> {product.recordLabel}
                </p>

                <p>
                  <strong>Catalog Code:</strong> {product.catalogCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
