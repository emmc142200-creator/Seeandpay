export type MercadoLibreItem = {
  id: string;
  name?: string;
  domain_id?: string;

  attributes?: Array<{
    id?: string;
    name?: string;
    value_id?: string | null;
    value_name?: string | null;
  }>;

  pictures?: Array<{
    id?: string;
    url?: string;
    secure_url?: string;
  }>;
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

export type MercadoLibreProductDetail = {
  id: string;
  name?: string;

  buy_box_winner?: {
    item_id?: string;
    seller_id?: number;
    price?: number;
    currency_id?: string;
    available_quantity?: number;

    shipping?: {
      free_shipping?: boolean;
      logistic_type?: string;
      mode?: string;
    };
  };
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

export async function getMercadoLibreProductDetail(
  productId: string,
  accessToken: string
): Promise<MercadoLibreProductDetail | null> {
  if (!productId.trim()) {
    return null;
  }

  const url = new URL(
    `https://api.mercadolibre.com/products/${productId}`
  );

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error(
      `Mercado Libre product detail error: ${response.status} ${errorText}`
    );

    return null;
  }

  return (await response.json()) as MercadoLibreProductDetail;
}