import { getMonthlyOccurrences } from '@/lib/occurrences';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()));
  const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));

  try {
    const occurrences = await getMonthlyOccurrences(year, month);
    return NextResponse.json(occurrences);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar ocorrências' },
      { status: 500 }
    );
  }
}