import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
/*
async function contarInspecoesPorDia(mes: number, ano: number) {
  const resultado = await prisma.inspection.groupBy({
    by: ['dataInspecao'],
    where: {
      dataInspecao: {
        gte: new Date(ano, mes - 1, 1), // Primeiro dia do mês
        lt: new Date(ano, mes, 1), // Primeiro dia do próximo mês
      },
    },
    _count: {id: true},
  });
  // Formatar o resultado para um objeto com data e contagem
  const somaPorDia: { [key: string]: number } = {};
  resultado.map(item => {
    const data = item.dataInspecao ? item.dataInspecao.toISOString().split('T')[0] : ''
    if (somaPorDia[data]) somaPorDia[data] += item._count.id; // Soma a contagem se a data já existir
    else somaPorDia[data] = item._count.id // Inicializa a contagem para a nova data
    return {
      data: item.dataInspecao ? item.dataInspecao.toISOString().split('T')[0] : '', // Formato YYYY-MM-DD
      contagem: item._count.id,
    };
  });
  return resultado;
  //const resultado = await contarInspecoesPorDia(Number(1), Number(2025));
}
*/

export async function GET() {
  try {
      const date = new Date();
      const gte = date.setDate(date.getDate() - 30);
      const lte = new Date()
      const where = { createdAt: { gte: new Date(gte), lte: new Date(lte) } };
      // Buscando todos os usuários
      const users = await prisma.user.count({where});
      const vehicles = await prisma.vehicle.count({where});
      const inspection = await prisma.inspection.count({where});

      

      const data = [
        {
          title: 'Usuários',
          value: `${users}`,
          interval: 'Últimos 30 dias',
          trend: 'up',
          data: [500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530,
            520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,],
        },
        {
          title: 'Veiculos',
          value: `${vehicles}`,
          interval: 'Últimos 30 dias',
          trend: 'down',
          data: [500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530,
            520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,],
        },
        {
          title: 'Inspeções',
          value: `${inspection}`,
          interval: 'Últimos 30 dias',
          trend: 'neutral',
          data: [
            500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530,
            520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
          ],
        }
      ];
      return NextResponse.json(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return NextResponse.json({error});
    } finally {
      await prisma.$disconnect();
    }
}