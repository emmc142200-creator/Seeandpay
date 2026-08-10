export type MercadoLibreItem = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  permalink: string;
  thumbnail: string;
};

type MercadoLibreSearchResponse = {
  results?: MercadoLibreItem[];
};

export async function searchMercadoLibre(query: string) {
  if (!query.trim()) {
    return [];
  }

  const url = new URL("https://api.mercadolibre.com/sites/MLM/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "10");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Mercado Libre API error: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as MercadoLibreSearchResponse;

  return data.results ?? [];
}