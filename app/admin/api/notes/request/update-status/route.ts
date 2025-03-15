import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const { requestId, status }: { requestId: string; status: string } = await request.json();

    if (!requestId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json({ error: "Invalid request ID" }, { status: 400 });
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/update-request-status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update request status in Django backend");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating request status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
