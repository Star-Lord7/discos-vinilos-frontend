import { useEffect, useState } from "react";

import ArtistList from "../../components/artist/ArtistList";
import ArtistSelect from "../../components/artist/ArtistSelect";
import ArtistProducts from "../../components/artist/ArtistProducts";
import { getArtists } from "../../services/artist";

interface ArtistOption {
  id: string;
  name: string;
}

export default function Artists() {
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const [artists, setArtists] = useState<ArtistOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArtists() {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (error) {
        console.error("Error cargando artistas:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadArtists();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6">
      {/* Encabezado */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-serif">Artists</h1>

        <p className="text-zinc-500 mt-3">Explore our collection by artist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
        {/* Selector para teléfonos y tablets */}
        <div className="lg:hidden">
          <ArtistSelect
            artists={artists}
            selectedArtistId={selectedArtistId}
            onSelectArtist={setSelectedArtistId}
            loading={loading}
          />
        </div>

        {/* Lista lateral solo en escritorio */}
        <div className="hidden lg:block lg:col-span-1">
          <h2 className="text-xl font-serif mb-5">Artists</h2>

          <ArtistList
            selectedArtistId={selectedArtistId}
            onSelectArtist={setSelectedArtistId}
          />
        </div>

        {/* Productos del artista seleccionado */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-serif mb-5">Records</h2>

          <ArtistProducts artistId={selectedArtistId} />
        </div>
      </div>
    </section>
  );
}
