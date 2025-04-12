import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get("id");
  const userId = request.nextUrl.searchParams.get("userId");
  try {
    if (id) {
      const experience = await prisma.userExperience.findUnique({
        where: { id: parseInt(id) },
        include: {
          user: true
        }
      });
      if (!experience) {
        return NextResponse.json({ notfound: true }, { status: 200 });
      }
      return NextResponse.json(experience);
    } else if (userId) {
      const experiences = await prisma.userExperience.findMany({
        where: { userId: parseInt(userId) },
        include: {
          user: true
        }
      });
      return NextResponse.json(experiences);
    } else {
      const experiences = await prisma.userExperience.findMany({
        include: {
          user: true
        }
      });
      return NextResponse.json(experiences);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    const experience = await prisma.userExperience.create({
      data: {
        ...data,
        userId: parseInt(data.userId),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    });
    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const { id, ...data } = await request.json();
    const experience = await prisma.userExperience.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        userId: data.userId ? parseInt(data.userId) : undefined,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : null
      }
    });
    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { id } = await request.json();
    await prisma.userExperience.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "User experience deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 