import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    // Validate session cookie
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Clean and generate unique filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}-${cleanName}`;
    const filePath = join(uploadDir, uniqueName);

    // Save file to disk
    await writeFile(filePath, buffer);

    // Return public URL path
    return NextResponse.json({
      success: true,
      url: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
