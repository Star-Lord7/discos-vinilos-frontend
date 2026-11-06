import { useEffect, useRef, useState, type FormEvent } from "react";
import { createProduct, type CreateProductDto } from "../../services/product";
import { getArtists } from "../../services/artist";
import { getCategories, getGenresByCategory } from "../../services/category";

interface Option {
  id: string;
  name: string;
}

interface ProductFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const initialForm: CreateProductDto = {
  name: "",
  album: "",
  description: "",
  price: 0,
  stock: 0,
  year: new Date().getFullYear(),
  format: "VINYL",
  recordLabel: "",
  catalogCode: "",
  categoryId: "",
  artistId: "",
  genreId: "",
};

export default function ProductForm({ onSuccess, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<CreateProductDto>(initialForm);
  const [artists, setArtists] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoadingOptions(true);

        const [artistsData, categoriesData] = await Promise.all([
          getArtists(),
          getCategories(),
        ]);

        setArtists(artistsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error cargando opciones:", err);
        setError("No se pudieron cargar los artistas, géneros y categorías.");
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    if (!form.categoryId) {
      return;
    }

    let cancelled = false;

    async function loadGenres() {
      try {
        const genresData = await getGenresByCategory(form.categoryId);

        if (!cancelled) {
          setGenres(genresData);
        }
      } catch (error) {
        console.error("Error cargando géneros:", error);

        if (!cancelled) {
          setGenres([]);
        }
      }
    }

    void loadGenres();

    return () => {
      cancelled = true;
    };
  }, [form.categoryId]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    if (name === "categoryId") {
      setGenres([]);

      setForm((previous) => ({
        ...previous,
        categoryId: value,
        genreId: "",
      }));

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: ["price", "stock", "year"].includes(name) ? Number(value) : value,
    }));
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Solo se permiten imágenes JPG, PNG y WEBP.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setError("La imagen no puede superar los 5 MB.");
      event.target.value = "";
      return;
    }

    setError(null);
    setImage(file);

    // Liberar la URL anterior
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    // Generar la nueva vista previa
    const previewUrl = URL.createObjectURL(file);

    previewUrlRef.current = previewUrl;
    setImagePreview(previewUrl);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!image) {
      setError("Debes seleccionar una imagen para el disco.");
      return;
    }

    try {
      setSaving(true);

      await createProduct(form, image);

      onSuccess();
    } catch (err) {
      console.error("Error creando el disco:", err);

      setError(
        "No se pudo registrar el disco. Verifica los datos e inténtalo nuevamente.",
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100";

  const labelClass = "block text-sm font-medium text-zinc-700 mb-2";

  if (loadingOptions) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Cargando artistas, géneros y categorías...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nombre del disco
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="album" className={labelClass}>
            Álbum
          </label>
          <input
            id="album"
            name="album"
            value={form.album}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="artistId" className={labelClass}>
            Artista
          </label>
          <select
            id="artistId"
            name="artistId"
            value={form.artistId}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Selecciona un artista</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="categoryId" className={labelClass}>
            Categoría
          </label>

          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Selecciona una categoría</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="genreId" className={labelClass}>
            Género musical
          </label>

          <select
            id="genreId"
            name="genreId"
            value={form.genreId}
            onChange={handleChange}
            className={inputClass}
            disabled={!form.categoryId}
            required
          >
            <option value="">
              {form.categoryId
                ? "Selecciona un género"
                : "Primero selecciona una categoría"}
            </option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="format" className={labelClass}>
            Formato
          </label>
          <select
            id="format"
            name="format"
            value={form.format}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="VINYL">Vinilo</option>
            <option value="CD">CD</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className={labelClass}>
            Precio ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className={labelClass}>
            Existencias
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="year" className={labelClass}>
            Año
          </label>
          <input
            id="year"
            name="year"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={form.year}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="recordLabel" className={labelClass}>
            Sello discográfico
          </label>
          <input
            id="recordLabel"
            name="recordLabel"
            value={form.recordLabel}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="catalogCode" className={labelClass}>
            Código de catálogo
          </label>
          <input
            id="catalogCode"
            name="catalogCode"
            value={form.catalogCode}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-6">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-zinc-700 mb-3"
        >
          Portada del disco
        </label>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-44 h-44 rounded-xl border-2 border-dashed border-zinc-300 overflow-hidden flex items-center justify-center bg-zinc-50">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Vista previa del disco"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-sm text-zinc-400 text-center px-4">
                Sin imagen seleccionada
              </span>
            )}
          </div>

          <div className="flex-1">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="block w-full text-sm text-zinc-600
          file:mr-4 file:rounded-lg file:border-0
          file:bg-orange-100 file:px-4 file:py-2
          file:font-medium file:text-orange-700
          hover:file:bg-orange-200"
              required
            />

            <p className="text-xs text-zinc-500 mt-3">
              Formatos permitidos: JPG, PNG y WEBP. Tamaño máximo: 5 MB.
            </p>

            {image && (
              <p className="text-sm text-green-700 mt-3">
                Imagen seleccionada: {image.name}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-zinc-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-300 px-5 py-3 text-zinc-700 hover:bg-zinc-100 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700 disabled:opacity-60 transition"
        >
          {saving ? "Guardando..." : "Guardar disco"}
        </button>
      </div>
    </form>
  );
}
