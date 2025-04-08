import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    const email= request.nextUrl.searchParams.get("email")
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email ?? undefined
      }
    });
    if (user === null) {
      return NextResponse.json({ notfound: true},{status:200});
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    const user = await prisma.user.create({ data });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const { id, ...data } = await request.json();
    const user = await prisma.user.update({ where: { id }, data });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { id } = await request.json();
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
