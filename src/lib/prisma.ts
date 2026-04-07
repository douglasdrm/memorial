import { PrismaClient } from '@prisma/client';

const getDatabaseUrl = () => {
    const url = process.env.DATABASE_URL || "";
    if (url && !url.includes("sslmode=")) {
        return url.includes("?") ? `${url}&sslmode=no-verify` : `${url}?sslmode=no-verify`;
    }
    return url;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
        db: {
            url: getDatabaseUrl(),
        },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
