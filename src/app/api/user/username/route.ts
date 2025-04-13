import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: NextRequest): Promise<Response> {
    try {
        const session = await auth();
        
        if (!session?.user?.email) {
            return NextResponse.json({ 
                error: "Not authenticated" 
            }, { status: 401 });
        }

        const email = request.nextUrl.searchParams.get("email");
        
        if (!email) {
            return NextResponse.json({ 
                error: "Email is required" 
            }, { status: 400 });
        }

        // Only allow users to fetch their own username
        if (email !== session.user.email) {
            return NextResponse.json({ 
                error: "Unauthorized" 
            }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                username: true
            }
        });

        if (!user) {
            return NextResponse.json({ 
                error: "User not found" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            username: user.username 
        });
    } catch (error: any) {
        console.error('Error fetching username:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
} 