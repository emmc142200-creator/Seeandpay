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

export async function searchMercadoLibre(
  query: string,
  accessToken: string
): Promise<MercadoLibreItem[]> {
  if (!query.trim()) {
    return [];
  }

  const url = new URL(
    "https://api.mercadolibre.com/sites/MLM/search"
  );

  url.searchParams.set("q", query);
  url.searchParams.set("limit", "10");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Mercado Libre API error: ${response.status} ${errorText}`
    );
  }

  const data =
    (await response.json()) as MercadoLibreSearchResponse;

  return data.results ?? [];
}