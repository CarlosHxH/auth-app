import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
//import { getServerSession } from "next-auth";

async function VehiclesAndInspections(userId: string) {
  try {
    const inspect = await prisma.inspection.findMany({
      where: { userId: userId }, // Replace userId with the actual user ID you want to query
      include: {
        vehicle: true, // Include the associated vehicle for each inspection
      },
    });

    return inspect;
  } catch (error) {
    console.error("Error fetching vehicles and inspections:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const userId = "cm52qclx60000hsiov8nc7vra"; // Replace with the actual user ID
    const data = await VehiclesAndInspections(userId)
    return NextResponse.json(data, { status: 200 });
    /*
    const session = await getServerSession()
    if(session){
      //const user = await prisma.user.findUnique({where: { email: session.user.email || "" }})
      if(user){
        const inspections = await prisma.inspecao.findMany()
        if (inspections.length===0) {
          return NextResponse.json({message:'empty'}, { status: 500 });
        }
        return NextResponse.json(inspections || {data:[]}, { status: 200 });
      } else {
        return false;
      }
    } else {
      throw "Usuário não autenticado!"
    }*/
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
