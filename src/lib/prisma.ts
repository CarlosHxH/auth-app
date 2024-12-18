import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const fakeArray = (value:number)=>Array.from({ length: value }, (_, i) => i + 1)