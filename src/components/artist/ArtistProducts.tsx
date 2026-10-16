import ProductGrid from "../product/ProductGrid";
import useArtistProducts from "../../hooks/useArtistProducts";

interface ArtistProductsProps {
  artistId: string | null;
}

export default function ArtistProducts({ artistId }: ArtistProductsProps) {
  const { products, loading, error } = useArtistProducts(artistId);

  if (!artistId) {
    return (
      <div className="flex items-center justify-center h-full min-h-96 border border-dashed border-zinc-300 rounded-xl">
        <p className="text-zinc-500">
          Selecciona un artista para ver sus discos
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-zinc-500">Cargando discos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-zinc-500">
          Este artista no tiene discos disponibles
        </p>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
