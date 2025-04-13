import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    const { jobId } = data;
    
    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const job = await prisma.job.findUnique({
      where: { id: parseInt(jobId) }
    });
    
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        userId: user.id,
        jobId: parseInt(jobId)
      }
    });
    
    if (existingApplication) {
      return NextResponse.json({ error: "You have already applied for this job" }, { status: 400 });
    }
    
    const application = await prisma.jobApplication.create({
      data: {
        userId: user.id,
        jobId: parseInt(jobId),
        status: "pending"
      }
    });
    
    return NextResponse.json(application, { status: 201 });
  } catch (error: any) {
    console.error("Error creating job application:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = request.nextUrl.searchParams.get("userId");
    const jobId = request.nextUrl.searchParams.get("jobId");
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (userId && parseInt(userId) !== user.id) {
      const job = await prisma.job.findUnique({
        where: { id: parseInt(jobId as string) },
        include: { startup: true }
      });
      
      if (!job || job.startup.founderId !== user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    
    const where: any = {};
    
    if (userId) {
      where.userId = parseInt(userId);
    } else {
      where.userId = user.id;
    }
    
    if (jobId) {
      where.jobId = parseInt(jobId);
    }
    
    const applications = await prisma.jobApplication.findMany({
      where,
      include: {
        job: {
          include: {
            startup: true
          }
        },
        user: true
      }
    });
    
    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
