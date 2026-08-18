import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("ml_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No Mercado Libre access token" },
      { status: 401 }
    );
  }

  const requestUrl = new URL(request.url);
  const catalogProductId = requestUrl.searchParams.get("id");

  if (!catalogProductId) {
    return NextResponse.json(
      {
        error: "Missing catalog product id",
        example:
          "/api/mercadolibre/offers-test?id=MLM24842092",
      },
      { status: 400 }
    );
  }

  const url = new URL(
    "https://api.mercadolibre.com/sites/MLM/search"
  );

  url.searchParams.set(
    "catalog_product_id",
    catalogProductId
  );

  url.searchParams.set("limit", "20");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        mercadoLibreStatus: response.status,
        catalogProductId,
        error: data,
      },
      { status: response.status }
    );
  }

  const offers = Array.isArray(data.results)
    ? data.results.map(
        (item: {
          id?: string;
          title?: string;
          price?: number;
          currency_id?: string;
          permalink?: string;
          thumbnail?: string;
          seller?: {
            id?: number;
            nickname?: string;
          };
          shipping?: {
            free_shipping?: boolean;
          };
        }) => ({
          itemId: item.id ?? null,
          title: item.title ?? null,
          price: item.price ?? null,
          currency: item.currency_id ?? null,
          permalink: item.permalink ?? null,
          thumbnail: item.thumbnail ?? null,
          sellerId: item.seller?.id ?? null,
          sellerNickname: item.seller?.nickname ?? null,
          freeShipping:
            item.shipping?.free_shipping ?? false,
        })
      )
    : [];

  return NextResponse.json({
    success: true,
    mercadoLibreStatus: response.status,
    catalogProductId,
    count: offers.length,
    offers,
  });
}