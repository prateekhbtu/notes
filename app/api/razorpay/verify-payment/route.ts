import { NextResponse } from "next/server";
import crypto from "crypto";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      tier,
      university,
      degree,
      year,
      semester,
      amount,
      couponCode,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      userId: string;
      tier: string;
      university: string;
      degree: string;
      year: "1st Year" | "2nd Year" | "3rd Year" | "4th Year";
      semester: string;
      amount: number;
      couponCode?: string;
    } = await request.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (university !== "Medicaps University") {
      return NextResponse.json(
        { error: "Invalid university" },
        { status: 400 }
      );
    }
    if (!["B Tech", "B Tech CSBS"].includes(degree)) {
      return NextResponse.json({ error: "Invalid degree" }, { status: 400 });
    }
    if (
      degree === "B Tech" &&
      !["1st Year", "2nd Year", "3rd Year"].includes(year)
    ) {
      return NextResponse.json(
        { error: "Invalid year for B Tech" },
        { status: 400 }
      );
    }
    if (
      degree === "B Tech CSBS" &&
      !["1st Year", "2nd Year", "3rd Year", "4th Year"].includes(year)
    ) {
      return NextResponse.json(
        { error: "Invalid year for B Tech CSBS" },
        { status: 400 }
      );
    }
    const validSemesters: { [key: string]: string[] } = {
      "1st Year": ["1st Semester", "2nd Semester"],
      "2nd Year": ["3rd Semester", "4th Semester"],
      "3rd Year": ["5th Semester", "6th Semester"],
      "4th Year": ["7th Semester", "8th Semester"],
    };
    if (!validSemesters[year] || !validSemesters[year].includes(semester)) {
      return NextResponse.json(
        { error: "Invalid semester for selected year" },
        { status: 400 }
      );
    }

    const rupeesAmount = amount / 100;

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/verify-payment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        tier,
        university,
        degree,
        year,
        semester,
        amount: rupeesAmount,
        couponCode,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify payment in Django backend");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error Verifying Payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
