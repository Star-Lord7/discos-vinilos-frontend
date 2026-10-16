import { useEffect, useState } from "react";

import ArtistItem from "./ArtistItem";
import type { Artist } from "../../interface/artist.interface";
import { getArtists } from "../../services/artist";

interface ArtistListProps {
  selectedArtistId: string | null;
  onSelectArtist: (artistId: string) => void;
}

export default function ArtistList({
  selectedArtistId,
  onSelectArtist,
}: ArtistListProps) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        const data = await getArtists();
        setArtists(data);
      } catch (error) {
        console.error("Error al cargar artistas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

  if (loading) {
    return <div className="p-5 text-zinc-500">Loading artists...</div>;
  }

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden">
      {artists.map((artist) => (
        <ArtistItem
          key={artist.id}
          artist={artist}
          selected={selectedArtistId === artist.id}
          onClick={() => onSelectArtist(artist.id)}
        />
      ))}
    </div>
  );
}
