import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if(id){
      const inspections = await prisma.inspecao.findMany({where: { id }})
      return NextResponse.json(inspections, { status: 200 });
    } else {
      return NextResponse.json({error: "Id não encontrado!"}, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
