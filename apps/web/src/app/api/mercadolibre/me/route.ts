import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("ml_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        authenticated: false,
        error: "No Mercado Libre access token found",
      },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      "https://api.mercadolibre.com/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Mercado Libre /users/me error:", data);

      return NextResponse.json(
        {
          authenticated: false,
          status: response.status,
          error: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: data,
    });
  } catch (error) {
    console.error("Error calling Mercado Libre /users/me:", error);

    return NextResponse.json(
      {
        authenticated: false,
        error: "Error communicating with Mercado Libre",
      },
      { status: 500 }
    );
  }
}