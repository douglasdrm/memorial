"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFamilia(formData: FormData) {
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const cpf = formData.get("cpf") as string;
  const telefone = formData.get("telefone") as string;

  if (!nome || !email || !cpf) {
    throw new Error("Nome, Email e CPF são obrigatórios.");
  }

  const familia = await prisma.usuario.create({
    data: {
      nome,
      email,
      cpf,
      telefone,
      tipo: "FAMILIA",
    },
  });

  revalidatePath("/admin/concessoes");
  return { success: true, familia };
}

export async function searchFamilias(query: string) {
    return await prisma.usuario.findMany({
        where: {
            tipo: "FAMILIA",
            OR: [
                { nome: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } },
                { cpf: { contains: query, mode: 'insensitive' } },
            ]
        },
        take: 5
    });
}
