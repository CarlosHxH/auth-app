import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession()
    if(session){
      const user = await prisma.user.findUnique({where: { email: session.user.email || "" }})
      if(user){
        const inspections = await prisma.inspecao.findMany({where: { userId: user.id }})
        return NextResponse.json(inspections, { status: 200 });
      } else {
        return false;
      }
    } else {
      throw "Usuário não autenticado!"
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
