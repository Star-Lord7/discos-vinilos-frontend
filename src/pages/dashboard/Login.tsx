import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Temporalmente solo navegamos al dashboard.
    // Aquí conectaremos la autenticación de NestJS más adelante.
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-10">
        <Link
          to="/"
          className="text-sm text-zinc-500 hover:text-orange-600 transition-colors"
        >
          ← Volver a la tienda
        </Link>

        <div className="mt-8 mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-orange-600">
            Vinyl Store
          </p>

          <h1 className="text-3xl font-serif text-zinc-900 mt-3">
            Acceso administrativo
          </h1>

          <p className="text-zinc-500 mt-3">
            Ingresa para administrar el catálogo de la tienda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 mb-2"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@vinylstore.com"
              required
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-700 mb-2"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white rounded-lg py-3 font-medium hover:bg-orange-600 transition-colors"
          >
            Entrar al panel
          </button>
        </form>

        <p className="text-xs text-zinc-400 mt-6 text-center">
          Formulario de demostración. La autenticación todavía no está
          habilitada.
        </p>
      </div>
    </main>
  );
}
