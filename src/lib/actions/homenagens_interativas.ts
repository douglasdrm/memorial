"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitComentario(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const autor = formData.get("autor") as string;
  const conteudo = formData.get("conteudo") as string;

  if (!memorialId || !autor || !conteudo) {
    throw new Error("Por favor, preencha todos os campos da mensagem.");
  }

  await prisma.mensagemMemorial.create({
    data: {
      memorialId,
      autor,
      conteudo,
      status: "PENDENTE",
    },
  });

  revalidatePath(`/memorial/${memorialId}`);
  return { success: true };
}

export async function submitVelaDigital(formData: FormData) {
  const memorialId = formData.get("memorialId") as string;
  const nomeExibicao = formData.get("nomeExibicao") as string;
  const diasDuracao = parseInt(formData.get("dias") as string);
  const valorPago = parseFloat(formData.get("valor") as string);

  if (!memorialId || !nomeExibicao || !diasDuracao) {
    throw new Error("Dados incompletos para acender a vela.");
  }

  const expiraEm = new Date();
  expiraEm.setDate(expiraEm.getDate() + diasDuracao);

  await prisma.homenagemDigital.create({
    data: {
      memorialId,
      tipo: "VELA" as any, // "VELA" ou "FLOR"
      nomeExibicao,
      expiraEm,
      valorPago,
      pago: true, // Placeholder para após o checkout
    },
  });

  revalidatePath(`/memorial/${memorialId}`);
  return { success: true };
}

export async function submitFloresDigital(formData: FormData) {
    const memorialId = formData.get("memorialId") as string;
    const nomeExibicao = formData.get("nomeExibicao") as string;
    const valorPago = parseFloat(formData.get("valor") as string);
  
    await prisma.homenagemDigital.create({
      data: {
        memorialId,
        tipo: "FLOR" as any,
        nomeExibicao,
        valorPago,
        pago: true,
      },
    });
  
    revalidatePath(`/memorial/${memorialId}`);
    return { success: true };
}

export async function getActiveHomenagens(memorialId: string) {
    const now = new Date();
    return await prisma.homenagemDigital.findMany({
        where: {
            memorialId,
            OR: [
                { expiraEm: null }, // Itens permanentes (Flores)
                { expiraEm: { gt: now } } // Velas ativas
            ]
        },
        orderBy: { dataCriacao: "desc" }
    });
}
