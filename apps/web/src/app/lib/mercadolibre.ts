export type MercadoLibreItem = {
  id: string;
  title: string;
  price: number;
  currency_id: string;
  available_quantity?: number;
  condition?: string;
  thumbnail: string;
  permalink: string;
};

type MercadoLibreSearchResponse = {
  keywords?: string;
  paging?: {
    total?: number;
    offset?: number;
    limit?: number;
  };
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
    "https://api.mercadolibre.com/products/search"
  );

  url.searchParams.set("site_id", "MLM");
  url.searchParams.set("status", "active");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "10");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
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