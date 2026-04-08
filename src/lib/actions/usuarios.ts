"use server";

import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function aprovarUsuario(id: string) {
  await requireSuperAdmin();

  await prisma.usuario.update({
    where: { id },
    data: { status: "ATIVO" },
  });

  revalidatePath("/admin/usuarios");
}

export async function suspenderUsuario(id: string) {
  await requireSuperAdmin();

  await prisma.usuario.update({
    where: { id },
    data: { status: "SUSPENSO" },
  });

  revalidatePath("/admin/usuarios");
}

export async function excluirUsuario(id: string) {
  await requireSuperAdmin();

  // Nota: Isso exclui apenas do nosso banco. 
  // O usuário ainda existirá no Supabase Auth (auth.users).
  // Para excluir de lá, precisaria do supabaseAdmin (service_role), mas por segurança vamos apenas suspender ou gerenciar aqui.
  await prisma.usuario.delete({
    where: { id },
  });

  revalidatePath("/admin/usuarios");
}
