import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const articles = await prisma.inspecaoVeiculo.findMany();
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  const { data } = await request.json();
  console.log(data);
  
  const inspecao = await prisma.inspecaoVeiculo.create({
    data: {
      nomeCompleto:'',
      placa:'',
      modelo:'',
      crlvEmDia:true,
      fotoCRLV:'',
      certificadoTacografoEmDia:true,
      fotoTacografo:'',
      nivelAgua: "Normal", // ou "Baixo", "Critico"
      fotoNivelAgua:'',
      nivelOleo: "Baixo", // ou "Normal", "Critico"
      situacaoPneus: "Bom", // ou "Ruim", "Normal"
      fotosPneusBom:'',
      motivoPneuRuim:'',
      fotosPneusRuim:'',
      pneuFurado:'',
      fotoPneuFurado:'',
      avariasCabine:false,
      descricaoAvariasCabine:'',
      fotosAvariasCabine:"",
      bauPossuiAvarias:false,
      descricaoAvariasBau:'',
      fotosAvariasBau:'',
      funcionamentoParteEletrica:false,
      motivoParteEletricaRuim:'',
      fotosParteEletricaRuim:'',
      sugestao:'',
    },
  });

  return NextResponse.json(inspecao, { status: 201 });
}