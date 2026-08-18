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
  const productId = requestUrl.searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      {
        error: "Missing catalog product id",
        example:
          "/api/mercadolibre/items-test?id=MLM24842092",
      },
      { status: 400 }
    );
  }

  const url = new URL(
    `https://api.mercadolibre.com/products/${productId}/items`
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

  return NextResponse.json({
    success: response.ok,
    mercadoLibreStatus: response.status,
    productId,
    data,
  });
}