import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { connectionId } = body;

    if (!connectionId) {
      return NextResponse.json({ error: "Connection ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const connection = await prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    if (connection.receiverId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedConnection = await prisma.connection.update({
      where: { id: connectionId },
      data: { status: "rejected" },
    });

    return NextResponse.json(updatedConnection);
  } catch (error) {
    console.error("Error rejecting connection:", error);
    return NextResponse.json(
      { error: "Failed to reject connection" },
      { status: 500 }
    );
  }
} 