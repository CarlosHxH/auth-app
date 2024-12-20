import { NextResponse } from "next/server";

const inspections = {
  id: 1,
  placa: "HFJ1234",
  modelo: "Volkswagen Constellation",
  dataInspecao: "2024-03-19",
  crlvEmDia: true,
  fotoCRLV: [{ url: "/placeholder.png", title: "CRLV" }],
  certificadoTacografoEmDia: true,
  fotoTacografo: [{ url: "/placeholder.png", title: "Tacógrafo" }],
  nivelAgua: "Normal",
  fotoNivelAgua: [{ url: "/placeholder.png", title: "Nível de Água" }],
  nivelOleo: "Normal",
  situacaoPneus: "Bom estado",
  fotosPneusBom: [{ url: "/placeholder.png", title: "Pneus" }],
  motivoPneuRuim: "",
  fotosPneusRuim: [],
  pneuFurado: "",
  fotoPneuFurado: [],
  avariasCabine: false,
  descricaoAvariasCabine: "",
  fotosAvariasCabine: [],
  bauPossuiAvarias: false,
  descricaoAvariasBau: "",
  fotosAvariasBau: [],
  funcionamentoParteEletrica: true,
  motivoParteEletricaRuim: "",
  fotosParteEletricaRuim: [],
  sugestao: "Nenhuma sugestão adicional.",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if(id){}
  return NextResponse.json(inspections, { status: 200 });
}
