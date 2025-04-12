import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: NextRequest): Promise<Response> {
    try {
        // Get the current session
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ 
                error: "Not authenticated" 
            }, { status: 401 });
        }

        // Check if user exists in database
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                id: true,
                email: true,
                username: true,
                peru: true,
                type: true,
                avatar: true,
                bio: true,
                location: true,
                skills: true,
                areasofinterest: true,
                availableFor: true
            }
        });

        if (!user) {
            return NextResponse.json({ 
                exists: false,
                email: session.user.email,
                image: session.user.image,
                name: session.user.name
            });
        }

        return NextResponse.json({ 
            exists: true,
            user
        });
    } catch (error: any) {
        console.error('Error checking user:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
} 