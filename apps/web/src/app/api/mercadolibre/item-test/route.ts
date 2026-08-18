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
  const itemId = requestUrl.searchParams.get("id");

  if (!itemId) {
    return NextResponse.json(
      {
        error: "Missing item id",
        example:
          "/api/mercadolibre/item-test?id=MLM1234567890",
      },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://api.mercadolibre.com/items/${itemId}`
  );

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const responseText = await response.text();

  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    data = responseText;
  }

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        mercadoLibreStatus: response.status,
        itemId,
        error: data,
      },
      { status: response.status }
    );
  }

  return NextResponse.json({
    success: true,
    mercadoLibreStatus: response.status,
    itemId,
    item: {
      id: data.id ?? null,
      title: data.title ?? null,
      price: data.price ?? null,
      currencyId: data.currency_id ?? null,
      permalink: data.permalink ?? null,
      thumbnail: data.thumbnail ?? null,
      availableQuantity: data.available_quantity ?? null,
      soldQuantity: data.sold_quantity ?? null,
      status: data.status ?? null,
      catalogProductId: data.catalog_product_id ?? null,
      sellerId: data.seller_id ?? null,
      shipping: data.shipping ?? null,
    },
    raw: data,
  });
}