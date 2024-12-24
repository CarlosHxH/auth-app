import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
//import { getServerSession } from "next-auth";

async function VehiclesAndInspections(userId: string) {
  try {
    const userWithVehiclesAndInspections = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        vehicles: true,
        inspections: true,
      },
    });
    console.log({data:userWithVehiclesAndInspections});
    
    return userWithVehiclesAndInspections;
  } catch (error) {
    console.error("Error fetching vehicles and inspections:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const userId = "your-user-id-here"; // Replace with the actual user ID
    VehiclesAndInspections(userId)
      .then((data) => {
        console.log("User  Vehicles and Inspections:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const inspections = await prisma.vehicles.findMany();
    return NextResponse.json(inspections || { data: [] }, { status: 200 });
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
