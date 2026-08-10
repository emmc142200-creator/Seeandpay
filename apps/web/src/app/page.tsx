export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight">
            SeeAndPay
          </div>

          <nav className="flex items-center gap-6 text-sm text-neutral-600">
            <a href="#categorias" className="hover:text-black">
              Categorías
            </a>
            <a href="#como-funciona" className="hover:text-black">
              Cómo funciona
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Compara moda en México
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
            Encuentra el mejor precio
            <span className="block">antes de comprar.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Busca ropa, tenis y accesorios en distintas tiendas desde un solo
            lugar.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Ej. Nike Air Force 1 blancos"
              className="h-14 flex-1 rounded-2xl border border-neutral-300 bg-white px-5 text-base outline-none transition focus:border-neutral-900"
            />

            <button className="h-14 rounded-2xl bg-black px-7 font-medium text-white transition hover:bg-neutral-800">
              Buscar
            </button>
          </div>

          <button className="mt-4 text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-black">
            📷 Buscar con una foto
          </button>
        </div>
      </section>

      <section id="categorias" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">
              Explora
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Categorías populares
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Tenis", "Playeras", "Chamarras", "Accesorios"].map((category) => (
            <div
              key={category}
              className="rounded-3xl border border-neutral-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-12 text-sm text-neutral-400">
                SeeAndPay
              </div>

              <h3 className="text-xl font-semibold">{category}</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Compara precios entre diferentes tiendas.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="como-funciona"
        className="border-t border-neutral-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-semibold tracking-tight">
            Una búsqueda. Varias tiendas.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-neutral-400">01</div>
              <h3 className="mt-3 text-lg font-semibold">Busca</h3>
              <p className="mt-2 text-neutral-600">
                Escribe lo que quieres encontrar o sube una fotografía.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-neutral-400">02</div>
              <h3 className="mt-3 text-lg font-semibold">Compara</h3>
              <p className="mt-2 text-neutral-600">
                Ve el mismo producto disponible en distintas tiendas.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-neutral-400">03</div>
              <h3 className="mt-3 text-lg font-semibold">Compra</h3>
              <p className="mt-2 text-neutral-600">
                Elige la mejor opción y continúa tu compra directamente con la
                tienda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}