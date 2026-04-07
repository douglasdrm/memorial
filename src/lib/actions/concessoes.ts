"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createConcessao(formData: FormData) {
  const nichoId = formData.get("nichoId") as string;
  const familiaId = formData.get("usuarioId") as string;
  const dataInicio = new Date();

  if (!nichoId || !familiaId) {
    throw new Error("Nicho e Família são obrigatórios.");
  }

  // 1. Criar a Concessão
  const concessao = await prisma.concessao.create({
    data: {
      nichoId,
      familiaId,
      dataInicio,
      status: "ATIVO",
    },
  });

  // 2. Atualizar o status do Nicho
  await prisma.nicho.update({
    where: { id: nichoId },
    data: { status: "CONCEDIDO" }, 
  });

  revalidatePath("/admin/concessoes");
  revalidatePath("/admin/paroquias");
  return { success: true, concessao };
}

export async function getConcessoes() {
  return await prisma.concessao.findMany({
    include: {
      nicho: {
        include: { paroquia: true }
      },
      familia: true,
    },
    orderBy: { dataInicio: "desc" },
  });
}

export async function getFamilias() {
    return await prisma.usuario.findMany({
        where: { tipo: "FAMILIA" },
        orderBy: { nome: "asc" }
    });
}
