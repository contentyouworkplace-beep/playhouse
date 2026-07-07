import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, type ContentUser } from "@/lib/data/store";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value) {
      // Decode Base64 session cookie
      const decodedData = Buffer.from(session.value, "base64").toString("utf-8");
      const user = JSON.parse(decodedData);
      return NextResponse.json({ authenticated: true, user });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    const cookieStore = await cookies();

    if (action === "logout") {
      cookieStore.set("admin_session", "", {
        path: "/",
        maxAge: 0,
      });
      return NextResponse.json({ success: true });
    }

    if (action === "login") {
      const data = getContent();
      const users = data.users || [];

      // Find matching user
      const user = users.find(
        (u: ContentUser) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        // Encode user details into Base64 for the session cookie
        const sessionData = {
          email: user.email,
          role: user.role,
          name: user.name,
        };
        const encodedSession = Buffer.from(JSON.stringify(sessionData)).toString("base64");

        cookieStore.set("admin_session", encodedSession, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 86400, // 1 day
        });

        return NextResponse.json({ success: true, user: sessionData });
      }

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
