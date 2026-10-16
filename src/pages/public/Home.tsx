import { Link } from "react-router-dom";

import Hero from "../../components/layout/Hero";

export const Home = () => {
  return (
    <main>
      <Hero />

      {/* PRESENTACIÓN */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.25em] text-orange-600 text-sm">
              Sobre nosotros
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-zinc-900 mt-4 leading-tight">
              Más que una tienda de discos.
            </h2>
          </div>

          <div className="text-zinc-600 text-lg leading-relaxed">
            <p>
              Creemos que la música es mucho más que algo que escuchamos. Es una
              experiencia, un recuerdo y una parte de nuestra historia.
            </p>

            <p className="mt-6">
              En nuestra colección encontrarás discos de diferentes épocas,
              géneros y artistas, cuidadosamente seleccionados para amantes de
              la música y coleccionistas.
            </p>
          </div>
        </div>
      </section>

      {/* PROPUESTA DE VALOR */}

      <section className="bg-zinc-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="uppercase tracking-[0.25em] text-orange-600 text-sm">
              Nuestra colección
            </p>

            <h2 className="text-4xl md:text-5xl font-serif mt-4 text-zinc-900">
              Música para escuchar,
              <br />
              coleccionar y recordar.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CARD 1 */}

            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl text-orange-600">✦</div>

              <h3 className="text-2xl font-serif mt-6">Para coleccionistas</h3>

              <p className="text-zinc-500 mt-4 leading-relaxed">
                Encuentra ese álbum que estabas buscando o descubre uno nuevo
                para comenzar tu colección.
              </p>
            </div>

            {/* CARD 2 */}

            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl text-orange-600">◉</div>

              <h3 className="text-2xl font-serif mt-6">Discos seleccionados</h3>

              <p className="text-zinc-500 mt-4 leading-relaxed">
                Una colección formada por álbumes clásicos y esenciales que
                merecen un lugar en tu colección.
              </p>
            </div>

            {/* CARD 3 */}

            <div className="bg-white p-8 rounded-2xl">
              <div className="text-4xl text-orange-600">♪</div>

              <h3 className="text-2xl font-serif mt-6">Música para todos</h3>

              <p className="text-zinc-500 mt-4 leading-relaxed">
                Rock, jazz, blues, soul, pop, metal y muchos otros géneros para
                descubrir nuevos sonidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORAR */}

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-orange-600 text-sm">
            Explora
          </p>

          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-zinc-900">
            Encuentra la música que buscas.
          </h2>

          <p className="text-zinc-500 text-lg mt-6 leading-relaxed">
            Explora nuestra colección por discos, artistas, géneros y categorías
            para encontrar tus próximos favoritos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            to="/products"
            className="bg-zinc-900 text-white px-7 py-3 rounded-full hover:bg-orange-600 transition"
          >
            Ver discos
          </Link>

          <Link
            to="/artists"
            className="border border-zinc-900 px-7 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition"
          >
            Ver artistas
          </Link>

          <Link
            to="/genres"
            className="border border-zinc-900 px-7 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition"
          >
            Ver géneros
          </Link>

          <Link
            to="/categories"
            className="border border-zinc-900 px-7 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition"
          >
            Ver categorías
          </Link>
        </div>
      </section>

      {/* CTA FINAL */}

      <section className="bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="uppercase tracking-[0.25em] text-orange-500 text-sm">
            Tu próxima escucha
          </p>

          <h2 className="text-5xl md:text-6xl font-serif mt-4">
            Encuentra tu próximo disco.
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto mt-6 text-lg">
            Explora nuestra colección y descubre álbumes que merecen formar
            parte de tu historia musical.
          </p>

          <Link
            to="/products"
            className="inline-block mt-10 bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition"
          >
            Explorar colección
          </Link>
        </div>
      </section>
    </main>
  );
};
