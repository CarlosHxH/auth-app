// src/app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, {status:201});
  } catch (error) {
    return NextResponse.json(error, {status:500});
  }
}
