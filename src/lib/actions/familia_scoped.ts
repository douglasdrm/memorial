"use server";

import { prisma } from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getFamilySession() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return await prisma.usuario.findUnique({
    where: { email: user.email },
  });
}

export async function getMinhasConcessoes() {
  const familia = await getFamilySession();
  if (!familia) return [];

  return await prisma.concessao.findMany({
    where: { familiaId: familia.id },
    include: {
      nicho: {
        include: { paroquia: true }
      },
      memoriais: true
    },
    orderBy: { dataInicio: "desc" }
  });
}

export async function getMemorialById(id: string) {
    const familia = await getFamilySession();
    if (!familia) throw new Error("Acesso negado");

    const memorial = await prisma.memorial.findUnique({
        where: { id },
        include: {
            concessao: {
                include: {
                    nicho: { include: { paroquia: true } }
                }
            },
            fotos: true
        }
    });

    if (!memorial || memorial.concessao.familiaId !== familia.id) {
        throw new Error("Memorial não encontrado ou acesso negado.");
    }

    return memorial;
}
