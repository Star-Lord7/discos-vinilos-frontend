import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="h-[85vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1511379938547-c1f69419868d)",
      }}
    >
      <div className="bg-black/55 w-full h-full flex flex-col justify-center items-center text-center text-white px-6">
        <p className="uppercase tracking-[0.3em] text-orange-500 text-sm mb-5">
          Música · Colección · Cultura
        </p>

        <h1 className="text-5xl md:text-7xl font-serif mb-6">
          Descubre el vinilo
        </h1>

        <p className="text-xl max-w-2xl text-zinc-200 mb-10">
          Álbumes clásicos, artistas legendarios y música que ha trascendido
          generaciones.
        </p>

        <Link
          to="/products"
          className="bg-orange-600 px-8 py-4 rounded-full hover:bg-orange-700 transition"
        >
          Explorar colección
        </Link>
      </div>
    </section>
  );
}
