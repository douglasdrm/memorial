"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function finalizarContratacao(formData: FormData) {
  const nichoId = formData.get("nichoId") as string;
  
  // Dados da Família (Limpando máscaras antes de salvar)
  const nomeFamilia = formData.get("familia_nome") as string;
  const emailFamilia = formData.get("familia_email") as string;
  const cpfFamilia = (formData.get("familia_cpf") as string)?.replace(/\D/g, ""); // Remove tudo que não for número
  const telefoneFamilia = (formData.get("familia_telefone") as string)?.replace(/\D/g, "");

  // Dados do Falecido (Opcional se for compra antecipada)
  const nomeFalecido = formData.get("falecido_nome") as string;
  const dataNascimento = formData.get("falecido_nascimento") as string;
  const dataFalecimento = formData.get("falecido_falecimento") as string;

  if (!nichoId || !nomeFamilia || !emailFamilia) {
    throw new Error("Dados obrigatórios faltando.");
  }

  // 0. Verificar se o nicho já está ocupado por outra concessão ativa
  const nichoCheck = await prisma.nicho.findUnique({ where: { id: nichoId } });
  if (nichoCheck?.status === "CONCEDIDO" || nichoCheck?.status === "RESERVADO") {
      throw new Error("Este nicho já foi reservado ou ocupado.");
  }

  // 1. Criar ou Atualizar Usuário (Família) - Usando Upsert para evitar erro de duplicidade
  // Buscamos pelo e-mail e garantimos que o CPF/Nome sejam atualizados se necessário
  const usuario = await prisma.usuario.upsert({
    where: { email: emailFamilia },
    update: {
        nome: nomeFamilia,
        cpf: cpfFamilia,
        telefone: telefoneFamilia,
    },
    create: {
        email: emailFamilia,
        nome: nomeFamilia,
        cpf: cpfFamilia,
        telefone: telefoneFamilia,
        tipo: "FAMILIA",
        status: "ATIVO",
    },
  });

  // 2. Criar Concessão
  const concessao = await prisma.concessao.create({
    data: {
      nichoId,
      familiaId: usuario.id,
      dataInicio: new Date(),
      status: "ATIVO",
    },
  });

  // 3. Atualizar Nicho
  await prisma.nicho.update({
    where: { id: nichoId },
    data: { status: "CONCEDIDO" },
  });

  // 4. Criar Memorial (Rascunho)
  const memorial = await prisma.memorial.create({
    data: {
      concessaoId: concessao.id,
      nomeFalecido: nomeFalecido || "Homenageado",
      dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
      dataFalecimento: dataFalecimento ? new Date(dataFalecimento) : null,
      status: "PRIVADO", // Começa como rascunho
      slug: `homenagem-${Math.random().toString(36).substring(7)}`,
    },
  });

  revalidatePath("/contratacao");
  revalidatePath("/admin");
  
  // Retornar o link para o cliente redirecionar (evita erro de digest no try/catch)
  return { 
    success: true, 
    redirectUrl: `/contratacao/sucesso?id=${concessao.id}` 
  };
}
