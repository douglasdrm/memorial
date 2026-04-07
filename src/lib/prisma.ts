import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Inicialização ultra-limpa e padrão para evitar erros de Build na Vercel
// O Prisma lerá automaticamente a DATABASE_URL configurada no painel da Vercel
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
