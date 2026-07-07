// app/api/index-url/route.ts — Google Indexing API integration
import { NextRequest, NextResponse } from "next/server";

const SCOPES = "https://www.googleapis.com/auth/indexing";
const INDEXING_API = "https://indexing.googleapis.com/v3/urlNotifications:publish";

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKey = rawKey.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: email,
    scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${encode(header)}.${encode(payload)}`;

  // Import private key using Web Crypto API (Node.js 18+)
  const keyData = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s+/g, "");
  const binaryKey = Buffer.from(keyData, "base64");

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const jwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    throw new Error(`Token error: ${JSON.stringify(tokenData)}`);
  }
  return tokenData.access_token;
}

async function indexUrl(url: string, accessToken: string) {
  const res = await fetch(INDEXING_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  return res.json();
}

// POST /api/index-url
// Body: { url: string } or { urls: string[] }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const urls: string[] = body.urls ?? (body.url ? [body.url] : []);

    if (urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }
    if (urls.length > 200) {
      return NextResponse.json({ error: "Max 200 URLs per request" }, { status: 400 });
    }

    const accessToken = await getAccessToken();
    const results = await Promise.all(urls.map((u) => indexUrl(u, accessToken)));

    return NextResponse.json({ success: true, results });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
