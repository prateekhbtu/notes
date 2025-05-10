import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    !session.user?.id ||
    !session.user?.name ||
    !session.user?.email
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const refereeId = session.user.id;
  const refereeName = session.user.name;
  const refereeEmail = session.user.email;
  const body = await request.json();
  const { couponCode } = body;
  if (!couponCode) {
    return NextResponse.json(
      { error: "Coupon code is required" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/redeem-referral-code/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refereeId,
        refereeName,
        refereeEmail,
        couponCode,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to redeem referral code in Django backend");
    }

    const data = await response.json();
    return NextResponse.json({ success: true, referral: data });
  } catch (error) {
    console.error("Error redeeming referral code:", error);
    return NextResponse.json(
      { error: "Failed to redeem referral code" },
      { status: 500 }
    );
  }
}
