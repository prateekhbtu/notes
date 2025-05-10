import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const { noteUrl, issue, otherText, userId, userName, userEmail } =
      await request.json();

    if (!noteUrl || !issue || !userId || !userName || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/report-notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        noteUrl,
        issue,
        otherText,
        userId,
        userName,
        userEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit report notes to Django backend");
    }

    return NextResponse.json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
