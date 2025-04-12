import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get("id");
  const searchQuery = request.nextUrl.searchParams.get("q");
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const limit = parseInt(request.nextUrl.searchParams.get("limit") || "9");
  const skip = (page - 1) * limit;
  
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
      const where: Prisma.StartupWhereInput = searchQuery ? {
        OR: [
          { name: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { description: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { industry: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { location: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { problem: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { solution: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { patent: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } }
        ]
      } : {};

      const [startups, total] = await Promise.all([
        prisma.startup.findMany({
          where,
          skip,
          take: limit,
          include: {
            founder: true,
            jobs: true,
            investments: true,
            collaborations: true
          },
          orderBy: {
            id: 'desc'
          }
        }),
        prisma.startup.count({ where })
      ]);

      return NextResponse.json({
        startups,
        pagination: {
          total,
          page,
          limit,
          hasMore: skip + startups.length < total
        }
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    console.log('Creating startup with data:', data); // Debug log

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.founderEmail }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const startup = await prisma.startup.create({
      data: {
        name: data.name,
        description: data.description,
        problem: data.problem,
        solution: data.solution,
        industry: data.industry,
        location: data.location,
        teamSize: data.teamSize,
        patent: data.patent,
        funding: data.funding,
        founderId: user.id
      }
    });

    return NextResponse.json(startup);
  } catch (error: any) {
    console.error('Error creating startup:', error);
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
  