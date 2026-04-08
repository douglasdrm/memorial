"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function solicitarAcesso(formData: FormData) {
  const nome = formData.get("nome") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const telefone = formData.get("telefone") as string;

  if (!email || !password || !nome) {
    throw new Error("Dados obrigatórios faltando");
  }

  const supabase = await createClient();
  
  // 1. Criar usuário no Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: nome,
      },
    },
  });

  if (error) {
    console.error("Erro no signUp:", error.message);
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Erro ao criar usuário no sistema base.");
  }

  // 2. Criar perfil na nossa tabela Usuario com status PENDENTE
  try {
    await prisma.usuario.create({
      data: {
        id: data.user.id, // Sincroniza o ID com o do Supabase Auth
        nome,
        email,
        telefone,
        tipo: "GERENTE",
        status: "PENDENTE",
      },
    });
  } catch (dbError: any) {
    console.error("Erro ao criar perfil no banco:", dbError);
    // Se falhar a criação do perfil, o usuário no Supabase Auth vai existir mas sem perfil ATIVO.
    // O login vai barrar porque não encontra no perfil ou encontra como PENDENTE.
    throw new Error("Erro ao cadastrar perfil. Entre em contato com o suporte.");
  }

  redirect("/solicitar-acesso/sucesso");
}
