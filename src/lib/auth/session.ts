import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Retorna o usuário logado com dados do perfil (tipo, status, etc.)
export async function getSessionUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const usuario = await prisma.usuario.findUnique({
    where: { email: user.email },
  });

  return usuario;
}

// Exige que o usuário esteja logado. Redireciona para /login se não autenticado.
export async function requireAuth() {
  const usuario = await getSessionUser();
  if (!usuario) redirect("/login");
  return usuario;
}

// Exige que o usuário seja ADMIN_GERAL ou GERENTE
export async function requireAdmin() {
  const usuario = await requireAuth();
  if (usuario.tipo !== "ADMIN_GERAL" && usuario.tipo !== "GERENTE") {
    redirect("/login");
  }
  return usuario;
}

// Exige que o usuário seja especificamente ADMIN_GERAL
export async function requireSuperAdmin() {
  const usuario = await requireAuth();
  if (usuario.tipo !== "ADMIN_GERAL") redirect("/admin");
  return usuario;
}
