import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        sentConnections: true,
        receivedConnections: true,
        startups: true,
        collaborations: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const totalConnections = user.sentConnections.length + user.receivedConnections.length;
    const startups = user.startups.length;
    const activeProjects = user.collaborations.length;

    return NextResponse.json({
      totalConnections,
      startups,
      activeProjects,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 