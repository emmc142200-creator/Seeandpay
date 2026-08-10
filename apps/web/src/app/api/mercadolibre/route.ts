import { NextRequest, NextResponse } from "next/server";
import { searchMercadoLibre } from "../../lib/mercadolibre";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing q parameter",
      },
      { status: 400 }
    );
  }

  try {
    const items = await searchMercadoLibre(query);

    return NextResponse.json({
      success: true,
      query,
      count: items.length,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Mercado Libre error",
      },
      { status: 500 }
    );
  }
}