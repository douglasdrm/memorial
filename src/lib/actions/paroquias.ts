"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function createParoquia(formData: FormData) {
  const user = await requireAuth("admin");

  const nome = formData.get("nome") as string;
  const cnpj = formData.get("cnpj") as string;
  const endereco = formData.get("endereco") as string;
  const adminIds = formData.getAll("adminIds") as string[];

  if (!nome) throw new Error("Nome é obrigatório");
  if (!adminIds || adminIds.length === 0) throw new Error("Selecione pelo menos um administrador");

  await prisma.paroquia.create({
    data: {
      nome,
      cnpj,
      endereco,
      admins: {
        connect: adminIds.map(id => ({ id })),
      },
    },
  });

  revalidatePath("/admin/paroquias");
  return { success: true };
}

export async function getParoquias() {
  return await prisma.paroquia.findMany({
    orderBy: { nome: "asc" },
  });
}
