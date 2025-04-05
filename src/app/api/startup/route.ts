import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// STARTUPS CRUD
export async function GET(request: NextRequest): Promise<Response> {
    try {
      const startups = await prisma.startup.findMany();
      return NextResponse.json(startups);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  export async function POST(request: NextRequest): Promise<Response> {
    try {
      const data = await request.json();
      const startup = await prisma.startup.create({ data });
      return NextResponse.json(startup);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  export async function PUT(request: Request): Promise<Response> {
    try {
      const { id, ...data } = await request.json();
      const startup = await prisma.startup.update({ where: { id }, data });
      return NextResponse.json(startup);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  export async function PUT(request: Request): Promise<Response> {
    try {
      const { id } = await request.json();
      await prisma.startup.delete({ where: { id } });
      return NextResponse.json({ message: "Startup deleted successfully" });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  