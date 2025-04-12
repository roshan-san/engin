import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");
  const startupId = request.nextUrl.searchParams.get("startupId");
  try {
    if (id) {
      const collaboration = await prisma.collaboration.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true,
          startup: true,
          role: true
        }
      });
      if (!collaboration) {
        return NextResponse.json({ notfound: true }, { status: 200 });
      }
      return NextResponse.json(collaboration);
    } else if (userId) {
      const collaborations = await prisma.collaboration.findMany({
        where: { userId: parseInt(userId) },
        include: {
          user: true,
          startup: true,
          role: true
        }
      });
      return NextResponse.json(collaborations);
    } else if (startupId) {
      const collaborations = await prisma.collaboration.findMany({
        where: { startupId: parseInt(startupId) },
        include: {
          user: true,
          startup: true,
          role: true
        }
      });
      return NextResponse.json(collaborations);
    } else {
      const collaborations = await prisma.collaboration.findMany({
        include: {
          user: true,
          startup: true,
          role: true
        }
      });
      return NextResponse.json(collaborations);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    const collaboration = await prisma.collaboration.create({
      data: {
        ...data,
        userId: parseInt(data.userId),
        startupId: parseInt(data.startupId),
        roleId: parseInt(data.roleId)
      }
    });
    return NextResponse.json(collaboration);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const { id, ...data } = await request.json();
    const collaboration = await prisma.collaboration.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        userId: data.userId ? parseInt(data.userId) : undefined,
        startupId: data.startupId ? parseInt(data.startupId) : undefined,
        roleId: data.roleId ? parseInt(data.roleId) : undefined
      }
    });
    return NextResponse.json(collaboration);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { id } = await request.json();
    await prisma.collaboration.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Collaboration deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 