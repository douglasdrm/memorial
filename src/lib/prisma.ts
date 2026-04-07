import { PrismaClient } from "@prisma/client";

// Função para garantir que a URL sempre tenha o sslmode=no-verify
// removendo qualquer conflito de 'require' vindo da Vercel
const getDatabaseUrl = () => {
  let url = process.env.DATABASE_URL || "";
  if (url) {
    if (url.includes("sslmode=")) {
      url = url.replace(/sslmode=[^&]+/, "sslmode=no-verify");
    } else {
      url = url.includes("?") 
        ? `${url}&sslmode=no-verify` 
        : `${url}?sslmode=no-verify`;
    }
  }
  return url;
};

// Sobrescrevendo a variável global para que o Prisma Rust Engine a veja
process.env.DATABASE_URL = getDatabaseUrl();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
