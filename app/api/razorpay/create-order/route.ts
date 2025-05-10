import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const currentUserId = session.user.id;

  try {
    const {
      tier,
      university,
      degree,
      year,
      semester,
      couponCode,
    }: {
      tier: string;
      university: string;
      degree: string;
      year: string;
      semester: string;
      couponCode?: string;
    } = await request.json();

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/create-order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tier,
        university,
        degree,
        year,
        semester,
        couponCode,
        userId: currentUserId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order in Django backend");
    }

    const order = await response.json();

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error Creating Razorpay Order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
