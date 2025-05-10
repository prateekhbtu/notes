import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Constants for error messages and status codes
const ERROR_MESSAGES = {
  MISSING_FIELDS: "All fields are required.",
  USER_NOT_FOUND: "User not found.",
  USER_BLOCKED: "You are blocked by an admin from submitting requests.",
  INVALID_USER_ID: "Invalid user ID format.",
  INVALID_REQUEST_ID: "Invalid request ID format.",
  SERVER_ERROR: "Internal server error.",
  REQUEST_NOT_FOUND: "Request not found.",
};
const SUCCESS_MESSAGE = "Request successfully updated.";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

// POST: Create a new notes request
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const {
      university,
      degree,
      year,
      semester,
      subject,
      syllabus,
      phoneNumber,
      userId,
    } = requestBody;

    const requiredFields = [
      "university",
      "degree",
      "year",
      "semester",
      "subject",
      "syllabus",
      "phoneNumber",
      "userId",
    ];

    const missingFields = requiredFields.filter((field) => !requestBody[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `${ERROR_MESSAGES.MISSING_FIELDS}: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_USER_ID },
        { status: 400 }
      );
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/create-notes-request/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        university,
        degree,
        year,
        semester,
        subject,
        syllabus,
        phoneNumber,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create notes request in Django backend");
    }

    return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 200 });
  } catch (error) {
    console.error("Failed to save request notes:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

// PATCH: Update the status of an existing notes request
export async function PATCH(request: Request) {
  try {
    const { requestId, status }: { requestId: string; status: string } =
      await request.json();

    if (!requestId || !status) {
      return NextResponse.json(
        { error: "Request ID and status are required." },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json(
        { error: "Invalid Request ID." },
        { status: 400 }
      );
    }

    const response = await fetch(`${DJANGO_BACKEND_URL}/api/update-request-status/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update request status in Django backend");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to update request status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
