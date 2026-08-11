import { NextResponse } from "next/server";
import crypto from "crypto";

function base64UrlEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export async function GET() {
  const clientId = process.env.MERCADOLIBRE_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing MERCADOLIBRE_CLIENT_ID" },
      { status: 500 }
    );
  }

  const codeVerifier = base64UrlEncode(crypto.randomBytes(32));

  const codeChallenge = base64UrlEncode(
    crypto.createHash("sha256").update(codeVerifier).digest()
  );

  const redirectUri =
    "https://seeandpay.vercel.app/api/mercadolibre/callback";

  const authorizationUrl = new URL(
    "https://auth.mercadolibre.com.mx/authorization"
  );

  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("code_challenge", codeChallenge);
  authorizationUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(authorizationUrl);

  response.cookies.set("ml_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}