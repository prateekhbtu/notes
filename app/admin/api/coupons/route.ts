import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/coupons/`);
    if (!response.ok) {
      throw new Error("Failed to fetch coupons from Django backend");
    }
    const coupons = await response.json();
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { code, type, value, expiryDate, usageLimit } = await request.json();

    if (!code || !type || value == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (type !== "flat" && type !== "percent") {
      return NextResponse.json({ error: "Invalid coupon type" }, { status: 400 });
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/create-coupon/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, type, value, expiryDate, usageLimit }),
    });

    if (!response.ok) {
      throw new Error("Failed to create coupon in Django backend");
    }

    const coupon = await response.json();
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}
