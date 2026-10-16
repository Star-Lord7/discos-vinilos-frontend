import type { Artist } from "../../interface/artist.interface";

interface ArtistItemProps {
  artist: Artist;
  selected: boolean;
  onClick: () => void;
}

export default function ArtistItem({
  artist,
  selected,
  onClick,
}: ArtistItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 border-b border-zinc-200 transition ${
        selected ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-800"
      }`}
    >
      <p className="font-serif text-xl">{artist.name}</p>

      <p
        className={`text-sm mt-1 ${
          selected ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {artist.country}
      </p>
    </button>
  );
}
