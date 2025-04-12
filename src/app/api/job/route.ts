import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get("id");
  const startupId = request.nextUrl.searchParams.get("startupId");
  try {
    if (id) {
      const job = await prisma.job.findUnique({
        where: { id: parseInt(id) },
        include: {
          startup: true,
          applications: true
        }
      });
      if (!job) {
        return NextResponse.json({ notfound: true }, { status: 200 });
      }
      return NextResponse.json(job);
    } else if (startupId) {
      const jobs = await prisma.job.findMany({
        where: { startupId: parseInt(startupId) },
        include: {
          startup: true,
          applications: true
        }
      });
      return NextResponse.json(jobs);
    } else {
      const jobs = await prisma.job.findMany({
        include: {
          startup: true,
          applications: true
        }
      });
      return NextResponse.json(jobs);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    const job = await prisma.job.create({
      data: {
        ...data,
        startupId: parseInt(data.startupId)
      }
    });
    return NextResponse.json(job);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json();
    
    if (!data.id) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    
    // Extract the ID from the data
    const { id, ...updateData } = data;
    
    // Check if the job exists
    const existingJob = await prisma.job.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    // Update the job
    const job = await prisma.job.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        // Only parse startupId if it exists in the update data
        ...(updateData.startupId ? { startupId: parseInt(updateData.startupId) } : {})
      }
    });
    
    return NextResponse.json(job);
  } catch (error: any) {
    console.error("Error updating job:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const { id } = await request.json();
    await prisma.job.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 