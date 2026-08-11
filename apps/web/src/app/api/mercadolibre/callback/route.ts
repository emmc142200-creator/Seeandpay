import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const codeVerifier = request.cookies.get("ml_code_verifier")?.value;

  const clientId = process.env.MERCADOLIBRE_CLIENT_ID;
  const clientSecret = process.env.MERCADOLIBRE_CLIENT_SECRET;

  const redirectUri =
    "https://seeandpay.vercel.app/api/mercadolibre/callback";

  if (!code) {
    return NextResponse.json(
      { error: "Mercado Libre did not return an authorization code" },
      { status: 400 }
    );
  }

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "Missing PKCE code verifier" },
      { status: 400 }
    );
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing Mercado Libre credentials" },
      { status: 500 }
    );
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const tokenResponse = await fetch(
    "https://api.mercadolibre.com/oauth/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
      cache: "no-store",
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error("Mercado Libre OAuth error:", tokenData);

    return NextResponse.json(
      {
        error: "Could not obtain Mercado Libre access token",
        details: tokenData,
      },
      { status: tokenResponse.status }
    );
  }

  const response = NextResponse.redirect(
    new URL("/", request.url)
  );

  response.cookies.set("ml_access_token", tokenData.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: tokenData.expires_in ?? 21600,
    path: "/",
  });

  if (tokenData.refresh_token) {
    response.cookies.set("ml_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  }

  response.cookies.delete("ml_code_verifier");

  return response;
}