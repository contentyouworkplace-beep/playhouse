import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent } from "@/lib/data/store";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = getContent();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Decode user details from session
    let currentUser;
    try {
      const decodedData = Buffer.from(session.value, "base64").toString("utf-8");
      currentUser = JSON.parse(decodedData);
    } catch {
      return NextResponse.json({ error: "Invalid session cookie" }, { status: 401 });
    }

    const updatedData = await request.json();

    if (!updatedData || typeof updatedData !== "object" || Array.isArray(updatedData)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Role-based capability checks
    const existingData = getContent();
    if (currentUser.role !== "Admin") {
      // Compare settings and users sections to verify no unauthorized changes are made
      const settingsChanged = JSON.stringify(existingData.settings) !== JSON.stringify(updatedData.settings);
      const usersChanged = JSON.stringify(existingData.users) !== JSON.stringify(updatedData.users);

      if (settingsChanged || usersChanged) {
        return NextResponse.json(
          { error: "Access Denied: Managers cannot modify settings or user accounts." },
          { status: 403 }
        );
      }
    }

    const success = saveContent(updatedData);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to write database file" }, { status: 500 });
    }
  } catch (error) {
    console.error("Content API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
