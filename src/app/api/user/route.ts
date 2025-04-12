import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from '@prisma/client';
import { z } from 'zod';

// Validation schemas
const userSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    peru: z.string().min(2),
    type: z.string(),
    bio: z.string(),
    location: z.string(),
    avatar: z.string(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    skills: z.array(z.string()),
    areasofinterest: z.array(z.string()),
    availableFor: z.string(),
});

export async function GET(request: NextRequest): Promise<Response> {
    const email = request.nextUrl.searchParams.get("email");
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const search = request.nextUrl.searchParams.get("search") || "";
    const limit = 10; // Number of users per page

    try {
        // If email is provided, fetch single user
        if (email) {
            const user = await prisma.user.findUnique({
                where: { email },
                include: {
                    startups: true,
                    experiences: true,
                    sentConnections: {
                        include: {
                            receiver: {
                                select: {
                                    id: true,
                                    peru: true,
                                    username: true,
                                    avatar: true,
                                    type: true
                                }
                            }
                        }
                    },
                    receivedConnections: {
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    peru: true,
                                    username: true,
                                    avatar: true,
                                    type: true
                                }
                            }
                        }
                    }
                }
            });
            
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            return NextResponse.json(user);
        }

        // Fetch multiple users with pagination and search
        const where: Prisma.UserWhereInput = search ? {
            OR: [
                { peru: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { username: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { bio: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { skills: { has: search } },
                { areasofinterest: { has: search } }
            ]
        } : {};

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    startups: true,
                    experiences: true,
                    sentConnections: {
                        include: {
                            receiver: {
                                select: {
                                    id: true,
                                    peru: true,
                                    username: true,
                                    avatar: true,
                                    type: true
                                }
                            }
                        }
                    },
                    receivedConnections: {
                        include: {
                            sender: {
                                select: {
                                    id: true,
                                    peru: true,
                                    username: true,
                                    avatar: true,
                                    type: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    peru: 'asc'
                }
            }),
            prisma.user.count({ where })
        ]);

        return NextResponse.json({
            users,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
                hasMore: page * limit < total
            }
        });
    } catch (error: any) {
        console.error('Error in user API:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<Response> {
    try {
        const data = await request.json();
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });
        
        if (existingUser) {
            return NextResponse.json({ 
                error: "User with this email already exists" 
            }, { status: 409 });
        }

        // Create new user
        const user = await prisma.user.create({ 
            data: {
                email: data.email,
                username: data.username,
                peru: data.peru,
                type: data.type,
                avatar: data.avatar,
                bio: data.bio,
                location: data.location,
                skills: data.skills || [],
                areasofinterest: data.areasofinterest || [],
                availableFor: data.availableFor,
                linkedin: data.linkedin || '',
                github: data.github || ''
            }
        });
        
        return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
}

export async function PUT(request: NextRequest): Promise<Response> {
    try {
        const { id, ...data } = await request.json();
        
        if (!id) {
            return NextResponse.json({ 
                error: "User ID is required" 
            }, { status: 400 });
        }

        // Validate request body
        const validatedData = userSchema.partial().parse(data);
        
        const user = await prisma.user.update({ 
            where: { id }, 
            data: validatedData 
        });
        
        return NextResponse.json(user);
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ 
                error: "Invalid data", 
                details: error.errors 
            }, { status: 400 });
        }
        if (error.code === 'P2025') {
            return NextResponse.json({ 
                error: "User not found" 
            }, { status: 404 });
        }
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest): Promise<Response> {
    try {
        const { id } = await request.json();
        
        if (!id) {
            return NextResponse.json({ 
                error: "User ID is required" 
            }, { status: 400 });
        }

        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ 
            message: "User deleted successfully" 
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return NextResponse.json({ 
                error: "User not found" 
            }, { status: 404 });
        }
        return NextResponse.json({ 
            error: error.message || 'An unexpected error occurred' 
        }, { status: 500 });
    }
}
