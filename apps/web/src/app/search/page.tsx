import Link from "next/link";
import { products } from "../data/products";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() ?? "";

  const results = products.filter((product) =>
    [product.name, product.brand, product.category]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-neutral-500 hover:text-black">
          ← Volver
        </Link>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Resultados
        </h1>

        <p className="mt-2 text-neutral-600">
          Búsqueda: <strong>{params.q || "Todos los productos"}</strong>
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => {
            const lowestPrice = Math.min(
              ...product.offers.map((offer) => offer.price)
            );

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm text-neutral-500">{product.brand}</p>

                  <h2 className="mt-1 text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="mt-4 text-sm text-neutral-500">Desde</p>

                  <p className="text-2xl font-semibold">
                    ${lowestPrice.toLocaleString("es-MX")}
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    Disponible en {product.offers.length} tiendas
                  </p>

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
                  >
                    Comparar precios
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8">
            No encontramos productos para esa búsqueda.
          </div>
        )}
      </div>
    </main>
  );
}