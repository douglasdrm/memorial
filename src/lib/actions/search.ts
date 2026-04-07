"use server";

import { prisma } from "@/lib/prisma";

export async function searchMemoriais(query: string) {
  if (!query || query.length < 2) return [];

  const results = await prisma.memorial.findMany({
    where: {
      OR: [
        { nomeFalecido: { contains: query, mode: 'insensitive' } },
        { 
            concessao: { 
                nicho: { 
                    paroquia: { nome: { contains: query, mode: 'insensitive' } } 
                } 
            } 
        }
      ],
      status: 'PUBLICO'
    },
    include: {
      concessao: {
        include: {
          nicho: {
            include: {
              paroquia: true
            }
          }
        }
      },
      fotos: true
    },
    take: 10
  });

  return results;
}
