"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createInteresse(formData: FormData) {
  const nomeIgreja = formData.get("nomeIgreja") as string;
  const cidade = formData.get("cidade") as string;
  const email = formData.get("email") as string;
  const telefone = formData.get("telefone") as string;
  const responsavel = formData.get("responsavel") as string;

  if (!nomeIgreja || !email) {
      return { success: false, error: "Nome e Email são obrigatórios." };
  }

  try {
    await (prisma as any).interesseParoquia.create({
      data: {
        nomeIgreja,
        cidade,
        email,
        telefone: telefone || "--",
        responsavel: responsavel || "--",
      },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar interesse:", error);
    return { success: false, error: "Erro interno no servidor." };
  }
}
