import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/notes-usage-stats/`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes usage stats from Django backend");
    }
    const stats = await response.json();

    return new NextResponse(
      JSON.stringify(stats),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Expires: "0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch notes usage stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes usage stats" },
      { status: 500 }
    );
  }
}
