import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Get the userEmail from the query parameters
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");
    
    // Verify that the requested userEmail matches the logged-in user
    if (userEmail !== session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // First get the user's ID from their email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail || "",
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Fetch the user's startups using their ID
    const startups = await prisma.startup.findMany({
      where: {
        founderId: user.id,
      },
    });
    
    return NextResponse.json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json(
      { error: "Failed to fetch startups" },
      { status: 500 }
    );
  }
} 