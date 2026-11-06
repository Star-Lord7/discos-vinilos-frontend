import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Music2, Search } from "lucide-react";

interface ArtistOption {
  id: string;
  name: string;
}

interface ArtistSelectProps {
  artists: ArtistOption[];
  selectedArtistId: string | null;
  onSelectArtist: (id: string | null) => void;
  loading?: boolean;
}

export default function ArtistSelect({
  artists,
  selectedArtistId,
  onSelectArtist,
  loading = false,
}: ArtistSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedArtist = artists.find(
    (artist) => artist.id === selectedArtistId,
  );

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase()),
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

  function handleSelect(id: string | null) {
    onSelectArtist(id);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label
        id="artist-select-label"
        className="block text-sm font-medium text-zinc-700 mb-3"
      >
        Select an artist
      </label>

      {/* Botón del selector */}
      <button
        type="button"
        disabled={loading}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby="artist-select-label"
        className={`w-full flex items-center justify-between gap-3
          rounded-xl border bg-white px-4 py-4 text-left
          shadow-sm transition-all duration-200
          disabled:opacity-60
          ${
            open
              ? "border-orange-600 ring-2 ring-orange-100"
              : "border-zinc-300 hover:border-orange-400"
          }`}
      >
        <span className="flex items-center gap-3 min-w-0">
          <Music2 size={20} className="text-orange-600 shrink-0" />

          <span className="font-medium text-zinc-800 truncate">
            {loading
              ? "Loading artists..."
              : (selectedArtist?.name ?? "All artists")}
          </span>
        </span>

        <ChevronDown
          size={20}
          className={`text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-40
            bg-white border border-zinc-200 rounded-xl
            shadow-xl overflow-hidden"
        >
          {/* Buscador */}
          <div className="p-3 border-b border-zinc-100">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-lg px-3">
              <Search size={18} className="text-zinc-400" />

              <input
                type="text"
                placeholder="Search artists..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full py-3 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Opciones */}
          <div
            role="listbox"
            aria-label="Artists"
            className="max-h-60 overflow-y-auto p-2"
          >
            <button
              type="button"
              role="option"
              aria-selected={selectedArtistId === null}
              onClick={() => handleSelect(null)}
              className={`w-full flex items-center justify-between
                px-4 py-3 rounded-lg text-left text-sm transition
                ${
                  selectedArtistId === null
                    ? "bg-orange-50 text-orange-700 font-semibold"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
            >
              All artists
              {selectedArtistId === null && <Check size={17} />}
            </button>

            {filteredArtists.map((artist) => (
              <button
                key={artist.id}
                type="button"
                role="option"
                aria-selected={selectedArtistId === artist.id}
                onClick={() => handleSelect(artist.id)}
                className={`w-full flex items-center justify-between
                  px-4 py-3 rounded-lg text-left text-sm transition
                  ${
                    selectedArtistId === artist.id
                      ? "bg-orange-50 text-orange-700 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
              >
                <span className="truncate">{artist.name}</span>

                {selectedArtistId === artist.id && (
                  <Check size={17} className="shrink-0" />
                )}
              </button>
            ))}

            {filteredArtists.length === 0 && (
              <p className="text-center text-sm text-zinc-400 py-6">
                No artists found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
