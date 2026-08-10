import Link from "next/link";
import { products } from "../../data/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-50 px-6 py-12 text-neutral-900">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm text-neutral-500 hover:text-black">
            ← Volver
          </Link>

          <h1 className="mt-8 text-4xl font-semibold">
            Producto no encontrado
          </h1>
        </div>
      </main>
    );
  }

  const sortedOffers = [...product.offers].sort(
    (a, b) => a.price - b.price
  );

  const lowestPrice = sortedOffers[0].price;
  const highestPrice = sortedOffers[sortedOffers.length - 1].price;
  const savings = highestPrice - lowestPrice;

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-neutral-500 transition hover:text-black"
        >
          ← Volver
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
              {product.brand}
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>

            <p className="mt-8 text-sm text-neutral-500">
              Mejor precio
            </p>

            <p className="mt-1 text-4xl font-semibold">
              ${lowestPrice.toLocaleString("es-MX")}
            </p>

            {savings > 0 && (
              <div className="mt-5 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                Puedes ahorrar hasta ${savings.toLocaleString("es-MX")}
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-semibold">
                Comparar precios
              </h2>

              <p className="mt-2 text-neutral-500">
                Disponible en {sortedOffers.length} tiendas
              </p>

              <div className="mt-6 space-y-3">
                {sortedOffers.map((offer, index) => (
                  <div
                    key={offer.store}
                    className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">{offer.store}</p>

                        {index === 0 && (
                          <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                            Mejor precio
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-neutral-500">
                        Precio actual
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <p className="text-xl font-semibold">
                        ${offer.price.toLocaleString("es-MX")}
                      </p>

                      <a
                        href={offer.url}
                        className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
                      >
                        Ir a tienda
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs leading-5 text-neutral-400">
                Los precios mostrados son datos de demostración para el
                desarrollo inicial de SeeAndPay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}