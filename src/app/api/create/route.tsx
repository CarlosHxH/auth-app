import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.user.findMany();
  return NextResponse.json(articles);
}
/*
export async function POST(request: Request) {
  const { title, description, body } = await request.json();
  const newArticle = await prisma.user.create({
    data: { title, description, body },
  });
  return NextResponse.json(newArticle, { status: 201 });
}*/