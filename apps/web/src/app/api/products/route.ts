import { NextRequest, NextResponse } from "next/server";
import { products } from "../../data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase().trim() ?? "";

  const filteredProducts = query
    ? products.filter((product) =>
        [product.name, product.brand, product.category]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : products;

  return NextResponse.json({
    success: true,
    query,
    count: filteredProducts.length,
    products: filteredProducts,
  });
}