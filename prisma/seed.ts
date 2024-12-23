import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    //const password = await bcrypt.hash("admin@123", 10)

    const admin = await prisma.user.findUnique({where: { email: 'admin@email.com' }})

    const userId = admin?.id || "cm4siwc2p0000hsksrouhaeue";
    const vehicle = await prisma.inspecao.create({
        data: {
            userId,
            placa: "HFJ1234",
            modelo: "Volkswagen Constellation",
            dataInspecao: new Date("2024-03-19T00:00:00Z"),
            crlvEmDia: true,
            fotoCRLV: JSON.stringify([{ url: "/placeholder.png", title: "CRLV" }]),
            certificadoTacografoEmDia: true,
            fotoTacografo: JSON.stringify([{ url: "/placeholder.png", title: "Tacógrafo" }]),
            nivelAgua: "Normal",
            fotoNivelAgua: JSON.stringify([{ url: "/placeholder.png", title: "Nível de Água" }]),
            nivelOleo: "Normal",
            fotoNivelOleo: JSON.stringify([{ url: "/placeholder.png", title: "Nível de Óleo" }]),
            situacaoPneus: "Bom estado",
            fotosPneusBom: JSON.stringify([{ url: "/placeholder.png", title: "Pneus" }]),
            motivoPneuRuim: "",
            fotosPneusRuim: JSON.stringify([]),
            pneuFurado: "",
            fotoPneuFurado: JSON.stringify([]),
            avariasCabine: false,
            descricaoAvariasCabine: "",
            fotosAvariasCabine: JSON.stringify([]),
            bauPossuiAvarias: false,
            descricaoAvariasBau: "",
            fotosAvariasBau: JSON.stringify([]),
            funcionamentoParteEletrica: true,
            motivoParteEletricaRuim: "",
            fotosParteEletricaRuim: JSON.stringify([]),
            sugestao: "Nenhuma sugestão adicional.",
        }
    })
    console.log(vehicle);

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })