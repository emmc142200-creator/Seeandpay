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
          Búsqueda:{" "}
          <strong>{query || "Todos los productos"}</strong>
        </p>

        {results.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-8">
            No encontramos productos para esa búsqueda.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => {
              const image =
                product.pictures?.[0]?.secure_url ||
                product.pictures?.[0]?.url;

              const title =
                product.name || "Producto de Mercado Libre";

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
                >
                  <div className="flex h-64 items-center justify-center bg-white p-6">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="text-sm text-neutral-400">
                        Imagen no disponible
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold">
                      {title}
                    </h2>

                    {product.domain_id && (
                      <p className="mt-2 text-sm text-neutral-500">
                        {product.domain_id
                          .replace("MLM-", "")
                          .replaceAll("_", " ")}
                      </p>
                    )}

                    <p className="mt-4 text-sm text-neutral-500">
                      Producto encontrado en el catálogo de Mercado Libre
                    </p>

                    <div className="mt-6 rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-600">
                      Precio pendiente de consultar en las publicaciones disponibles.
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}