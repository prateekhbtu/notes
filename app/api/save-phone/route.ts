import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const { userId, phoneNumber }: { userId: string; phoneNumber: string } =
      await request.json();

    if (!phoneNumber || phoneNumber.trim().length < 10) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/save-phone/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, phoneNumber }),
    });

    if (!response.ok) {
      throw new Error("Failed to save phone number in Django backend");
    }

    return NextResponse.json({
      success: true,
      message: "Phone number saved successfully",
    });
  } catch (error) {
    console.error("Error saving phone number:", error);
    return NextResponse.json(
      { error: "Failed to save phone number" },
      { status: 500 }
    );
  }
}
