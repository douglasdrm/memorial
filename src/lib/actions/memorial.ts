"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function verifyOwnership(memorialId: string) {
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
    if (!user) throw new Error("Não autorizado");

    const memorial = await prisma.memorial.findUnique({
        where: { id: memorialId },
        include: {
            concessao: {
                include: { familia: true }
            }
        }
    });

    if (!memorial || memorial.concessao.familia.email !== user.email) {
        throw new Error("Acesso negado ao memorial.");
    }

    return memorial;
}

export async function updateMemorial(id: string, formData: FormData) {
    // 1. Verificar se o usuário logado é o dono
    await verifyOwnership(id);

    const biografia = formData.get("biografia") as string;
    const slug = formData.get("slug") as string;
    const status = formData.get("status") as "PRIVADO" | "PUBLICO";

    // 2. Atualizar no banco
    await prisma.memorial.update({
        where: { id },
        data: {
            biografia,
            slug: slug || undefined,
            status,
        }
    });

    // 3. Limpar caches para refletir as mudanças
    revalidatePath(`/portal/memorial/${id}`);
    revalidatePath(`/memorial/${slug || id}`);
    revalidatePath("/portal");
}

export async function saveMemorialPhoto(memorialId: string, urlFoto: string) {
    await verifyOwnership(memorialId);

    const foto = await prisma.fotoMemorial.create({
        data: {
            memorialId,
            urlFoto,
            ordem: 0
        }
    });

    revalidatePath(`/portal/memorial/${memorialId}`);
    return foto;
}

export async function deleteMemorialPhoto(memorialId: string, fotoId: string) {
    await verifyOwnership(memorialId);

    await prisma.fotoMemorial.delete({
        where: { id: fotoId }
    });

    revalidatePath(`/portal/memorial/${memorialId}`);
}
