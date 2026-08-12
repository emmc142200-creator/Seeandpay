import { NextRequest, NextResponse } from "next/server";
import { getMercadoLibreProductDetail } from "../../../lib/mercadolibre";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("ml_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No Mercado Libre access token" },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const productId = url.searchParams.get("id");

  if (!productId) {
    return NextResponse.json(
      {
        error: "Missing product id",
        example:
          "/api/mercadolibre/product-test?id=MLM123456",
      },
      { status: 400 }
    );
  }

  const product = await getMercadoLibreProductDetail(
    productId,
    accessToken
  );

  if (!product) {
    return NextResponse.json(
      {
        error: "Could not retrieve Mercado Libre product detail",
        productId,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    productId,
    name: product.name ?? null,
    buyBoxWinner: product.buy_box_winner ?? null,
    raw: product,
  });
}