import { useState } from "react";

import ArtistList from "../../components/artist/ArtistList";
import ArtistProducts from "../../components/artist/ArtistProducts";

export default function Artists() {
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="mb-12">
        <h1 className="text-5xl font-serif">Artists</h1>

        <p className="text-zinc-500 mt-3">Explore our collection by artist.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Artists */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-serif mb-5">Artists</h2>

          <ArtistList
            selectedArtistId={selectedArtistId}
            onSelectArtist={setSelectedArtistId}
          />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-serif mb-5">Records</h2>

          <ArtistProducts artistId={selectedArtistId} />
        </div>
      </div>
    </section>
  );
}
