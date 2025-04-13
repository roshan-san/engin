import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pendingConnections = await prisma.connection.findMany({
      where: {
        receiverId: user.id,
        status: "pending",
      },
      include: {
        sender: {
          select: {
            peru: true,
            email: true,
            avatar: true,
          },
        },
      }
    });

    return NextResponse.json(pendingConnections);
  } catch (error) {
    console.error("Error fetching pending connections:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending connections" },
      { status: 500 }
    );
  }
} 