import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  searchMercadoLibre,
  type MercadoLibreItem,
} from "../lib/mercadolibre";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";

  let results: MercadoLibreItem[] = [];

  if (query) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("ml_access_token")?.value;

    if (!accessToken) {
      redirect("/api/auth/mercadolibre");
    }

    try {
      results = await searchMercadoLibre(query, accessToken);
    } catch (error) {
      console.error("Error consultando Mercado Libre:", error);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-black"
        >
          ← Volver
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Resultados
        </h1>

        <p className="mt-2 text-neutral-600">
          Búsqueda: <strong>{query || "Todos los productos"}</strong>
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
            No encontramos productos para esa búsqueda.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-64 w-full object-contain p-6"
                />

                <div className="p-6">
                  <h2 className="text-xl font-semibold">
                    {product.title}
                  </h2>

                  <p className="mt-4 text-2xl font-semibold">
                    ${product.price.toLocaleString("es-MX")}
                  </p>

                  <a
                    href={product.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-2xl bg-black px-5 py-3 text-white"
                  >
                    Ver en Mercado Libre
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}