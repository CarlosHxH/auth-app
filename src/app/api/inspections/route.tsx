import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    //const userId = (await params).userId;
    //if(userId){
      const inspections = await prisma.inspecao.findMany();//{where: { userId: userId }})
      console.log(inspections);
      return NextResponse.json(inspections, { status: 200 });
    //} else {
    //  return NextResponse.json({error: "Id não encontrado!"}, { status: 500 });
    //}
  } catch (error) {
    return NextResponse.json({error:"Não encontrado!"}, { status: 500 });
  }
}



export async function GETs() {
  const inspections = [
    {
      id: "1",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
    {
      id: "2",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
    {
      id: "3",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
    {
      id: "4",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
    {
      id: "5",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
    {
      id: "6",
      placa: "ABC-1234",
      modelo: "Volkswagen Constellation",
      crlvEmDia: true,
      certificadoTacografoEmDia: true,
      avariasCabine: false,
      bauPossuiAvarias: false,
      funcionamentoParteEletrica: true,
      dataInspecao: "2024-03-19",
    },
  ];
  return NextResponse.json(inspections, { status: 200 });
}
