import { NextResponse } from "next/server";

const DJANGO_BACKEND_URL = process.env.DJANGO_BACKEND_URL;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${DJANGO_BACKEND_URL}/api/notes-usage/`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes usage from Django backend");
    }
    const usageStats = await response.json();

    const finalStats = usageStats.map((doc: any) => {
      const slugParts = doc.noteSlug.split("/");
      const [university, degree, year, semester, subject, unit] = slugParts;

      let anonymousCount = 0;
      let verifiedCount = 0;
      let premiumCount = 0;
      let freeCount = 0;

      doc.userEntries.forEach((entry: any) => {
        if (!entry.email) {
          anonymousCount++;
        } else {
          verifiedCount++;
          if (entry.planTier && entry.planTier !== "Free") {
            premiumCount++;
          } else {
            freeCount++;
          }
        }
      });

      return {
        noteSlug: doc.noteSlug,
        totalViews: doc.totalViews,
        lastViewed: doc.lastViewed,
        userEntries: doc.userEntries,
        anonymousCount,
        verifiedCount,
        premiumCount,
        freeCount,
        university: university || "",
        degree: degree || "",
        year: year || "",
        semester: semester || "",
        subject: subject || "",
        unit: unit || "",
        noteLink: `${process.env.NEXTAUTH_URL || "http://notesbuddy.in"}/notes/${
          doc.noteSlug
        }`,
      };
    });

    return new NextResponse(JSON.stringify(finalStats), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Expires: "0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("Failed to fetch notes usage:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes usage" },
      { status: 500 }
    );
  }
}
