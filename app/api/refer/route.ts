import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/referral/${userId}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch referral from Django backend");
    }
    const referral = await response.json();
    return NextResponse.json({ referral });
  } catch (error) {
    console.error("Error fetching referral:", error);
    return NextResponse.json({ error: "Failed to fetch referral" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || !session.user?.name || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const referrerName = session.user.name;
  const referrerEmail = session.user.email;
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/create-referral/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        referrerName,
        referrerEmail,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create referral code in Django backend");
    }

    const referral = await response.json();
    return NextResponse.json({ referral });
  } catch (error) {
    console.error("Error creating referral code:", error);
    return NextResponse.json({ error: "Failed to create referral code" }, { status: 500 });
  }
}
