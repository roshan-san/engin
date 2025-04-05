import { NextResponse } from 'next/server';

export async function GET() {
  const users = {
    msg:"hello"
  };
  return NextResponse.json(users)
}