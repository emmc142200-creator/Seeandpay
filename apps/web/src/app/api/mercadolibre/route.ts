import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("ml_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token" },
      { status: 401 }
    );
  }

  const url = new URL("https://api.mercadolibre.com/products/search");

  url.searchParams.set("site_id", "MLM");
  url.searchParams.set("status", "active");
  url.searchParams.set("q", "Nike");

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json({
    mercadoLibreStatus: response.status,
    ok: response.ok,
    data,
  });
}