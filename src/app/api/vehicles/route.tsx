import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const vehicles = await prisma.vehicle.findMany();
  NextResponse.json( vehicles , { status: 200 });
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const vehicle = await prisma.vehicle.create({ data });
    return Response.json(vehicle,{status:201});
  } catch (error) {
    NextResponse.json({ error }, { status: 500 });
  }
}