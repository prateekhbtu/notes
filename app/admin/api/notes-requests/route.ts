import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ERROR_MESSAGES = {
  SERVER_ERROR: "Failed to fetch notes requests.",
  INVALID_OBJECT_ID: "Invalid userId format in requestNotes.",
  INVALID_REQUEST: "Invalid request payload.",
  UPDATE_FAILED: "Failed to update the request.",
};

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export async function GET() {
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/notes-requests/`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes requests from Django backend");
    }
    const notesRequests = await response.json();
    return NextResponse.json(notesRequests, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error(ERROR_MESSAGES.SERVER_ERROR, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Parse request body
    const { requestId, status }: { requestId: string; status: string } =
      await request.json();

    // Validate ObjectId
    if (!ObjectId.isValid(requestId)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_OBJECT_ID },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["Pending", "In Progress", "Completed", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_REQUEST },
        { status: 400 }
      );
    }

    // Update the request status in the Django backend
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
    console.error("Error updating notes request status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
