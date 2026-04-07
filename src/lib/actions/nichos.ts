"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function generateNichos(formData: FormData) {
  const paroquiaId = formData.get("paroquiaId") as string;
  const prefixo = formData.get("prefixo") as string; // Ex: "Ala A"
  const andar = parseInt(formData.get("andar") as string);
  const quantidade = parseInt(formData.get("quantidade") as string);
  const precoBase = parseFloat(formData.get("preco") as string);

  if (!paroquiaId || !quantidade) {
    throw new Error("Dados insuficientes para geração.");
  }

  const nichesData = [];

  for (let i = 1; i <= quantidade; i++) {
    nichesData.push({
      paroquiaId,
      identificador: `${prefixo}-${i.toString().padStart(2, '0')}`,
      andar,
      preco: precoBase || 0,
      status: "DISPONIVEL" as any,
    });
  }

  // Prisma createMany is efficient for bulk insertion
  await prisma.nicho.createMany({
    data: nichesData,
  });

  revalidatePath(`/admin/paroquias/${paroquiaId}/nichos`);
  revalidatePath("/admin");
  return { success: true, count: quantidade };
}

export async function getNichosByParoquia(paroquiaId: string) {
  return await prisma.nicho.findMany({
    where: { paroquiaId },
    include: { paroquia: true },
    orderBy: [
      { andar: "asc" },
      { identificador: "asc" }
    ],
  });
}

export async function getParoquiaById(id: string) {
    return await prisma.paroquia.findUnique({
        where: { id },
        include: { _count: { select: { nichos: true } } }
    });
}
