import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/referrals/`);
    if (!response.ok) {
      throw new Error("Failed to fetch referrals from Django backend");
    }
    const referrals = await response.json();
    return NextResponse.json({ referrals });
  } catch (error) {
    console.error("Error fetching referrals for admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}
