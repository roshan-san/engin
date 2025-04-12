import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
    try {
        const username = request.nextUrl.searchParams.get("username");
        
        if (!username) {
            return NextResponse.json({ 
                error: "Username is required" 
            }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        return NextResponse.json({ 
            exists: !!existingUser 
        });
    } catch (error: any) {
        console.error('Error checking username:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
} 