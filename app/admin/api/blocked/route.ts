import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

const ERROR_MESSAGES = {
  INVALID_USER_ID: "Invalid userId format.",
  INVALID_ACTION: "Invalid action. Action must be 'block' or 'unblock'.",
  USER_NOT_FOUND: "User not found or already updated.",
  SERVER_ERROR: "Failed to update user status.",
  FETCH_ERROR: "Failed to fetch blocked users.",
};

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/blocked-users/`);
    if (!response.ok) {
      throw new Error("Failed to fetch blocked users from Django backend");
    }
    const blockedUsers = await response.json();
    return NextResponse.json(blockedUsers);
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_ERROR },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { userId, action }: { userId: string; action: "block" | "unblock" } =
      body;
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_USER_ID },
        { status: 400 }
      );
    }
    if (!["block", "unblock"].includes(action)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_ACTION },
        { status: 400 }
      );
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/update-user-status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, action }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user status in Django backend");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(ERROR_MESSAGES.SERVER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}
