import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || !session.user?.name) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/generate-self-coupon/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate self-coupon in Django backend");
    }

    const data = await response.json();
    return NextResponse.json({ referral: data });
  } catch (error) {
    console.error("Error generating self-coupon:", error);
    return NextResponse.json(
      { error: "Failed to generate self-coupon" },
      { status: 500 }
    );
  }
}
