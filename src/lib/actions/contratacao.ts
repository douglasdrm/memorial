"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function finalizarContratacao(formData: FormData) {
  const nichoId = formData.get("nichoId") as string;
  
  // Dados da Família
  const nomeFamilia = formData.get("familia_nome") as string;
  const emailFamilia = formData.get("familia_email") as string;
  const cpfFamilia = formData.get("familia_cpf") as string;
  const telefoneFamilia = formData.get("familia_telefone") as string;

  // Dados do Falecido (Opcional se for compra antecipada)
  const nomeFalecido = formData.get("falecido_nome") as string;
  const dataNascimento = formData.get("falecido_nascimento") as string;
  const dataFalecimento = formData.get("falecido_falecimento") as string;

  if (!nichoId || !nomeFamilia || !emailFamilia) {
    throw new Error("Dados obrigatórios faltando.");
  }

  // 1. Criar ou Encontrar Usuário (Família)
  // Nota: Em um sistema real, aqui dispararíamos o convite de senha do Supabase
  let usuario = await prisma.usuario.findUnique({
    where: { email: emailFamilia },
  });

  if (!usuario) {
    usuario = await prisma.usuario.create({
      data: {
        email: emailFamilia,
        nome: nomeFamilia,
        cpf: cpfFamilia,
        telefone: telefoneFamilia,
        tipo: "FAMILIA",
        status: "ATIVO", // Para simplificar o teste inicial
      },
    });
  }

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
