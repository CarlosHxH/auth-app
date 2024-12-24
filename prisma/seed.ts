// src/lib/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('securepassword', 10);
  
  const userData = {
    email: 'user@example.com',
    password,
    name: 'John Doe',
    image: 'https://example.com/image.jpg',
    role: 'admin',
  };

  const user = await prisma.user.create({ data: userData });

  const vehicleData = {
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    licensePlate: 'ABC1234',
    userId: user.id,
  };

  const vehicle = await prisma.vehicle.create({ data: vehicleData });

  const inspectionData = {
    userId: user.id,
    vehicleId: vehicle.id,
    dataInspecao: new Date(),
    crlvEmDia: true,
    fotoCRLV: 'https://example.com/fotoCRLV.jpg',
    certificadoTacografoEmDia: true,
    fotoTacografo: 'https://example.com/fotoTacografo.jpg',
    nivelAgua: 'Adequado',
    fotoNivelAgua: 'https://example.com/fotoNivelAgua.jpg',
    nivelOleo: 'Adequado',
    fotoNivelOleo: 'https://example.com/fotoNivelOleo.jpg',
    situacaoPneus: 'Bom',
    fotosPneusBom: 'https://example.com/fotosPneusBom.jpg',
    pneuFurado: false,
    avariasCabine: false,
    bauPossuiAvarias: false,
    funcionamentoParteEletrica: true,
    sugestao: 'Tudo em ordem',
  };

  const inspection = await prisma.inspection.create({ data: inspectionData });

  console.log({ user, vehicle, inspection });
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });