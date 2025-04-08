import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
// STARTUPS CRUD
export async function GET(request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get("id");
  try {
    if (id) {
      const startup = await prisma.startup.findUnique({
        where: { id: parseInt(id) },
        include: {
          founder: true,
          jobs: true,
          investments: true,
          collaborations: true
        }
      });
      if (!startup) {
        return NextResponse.json({ notfound: true }, { status: 200 });
      }
      return NextResponse.json(startup);
    } else {
      const startups = await prisma.startup.findMany({
        include: {
          founder: true,
          jobs: true,
          investments: true,
          collaborations: true
        }
      });
      return NextResponse.json(startups);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    const startup = await prisma.startup.create({
      data: {
        ...data,
        founderId: parseInt(data.founderId)
      }
    });
    return NextResponse.json(startup);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const { id, ...data } = await request.json();
    const startup = await prisma.startup.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        founderId: data.founderId ? parseInt(data.founderId) : undefined
      }
    });
    return NextResponse.json(startup);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { id } = await request.json();
    await prisma.startup.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Startup deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
  