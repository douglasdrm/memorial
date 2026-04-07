"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMemorialByConcessao(concessaoId: string) {
  return await prisma.memorial.findUnique({
    where: { concessaoId },
    include: {
      fotos: { orderBy: { ordem: "asc" } },
      concessao: {
        include: {
          nicho: { include: { paroquia: true } },
          familia: true,
        }
      }
    }
  });
}

export async function upsertMemorial(formData: FormData) {
  const concessaoId = formData.get("concessaoId") as string;
  const nomeFalecido = formData.get("nomeFalecido") as string;
  const biografia = formData.get("biografia") as string;
  const dataNascimento = formData.get("dataNascimento") as string;
  const dataFalecimento = formData.get("dataFalecimento") as string;

  if (!concessaoId || !nomeFalecido) {
    throw new Error("ID da Concessão e Nome do Falecido são obrigatórios.");
  }

  const memorial = await prisma.memorial.upsert({
    where: { concessaoId },
    update: {
      nomeFalecido,
      biografia,
      dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
      dataFalecimento: dataFalecimento ? new Date(dataFalecimento) : null,
    },
    create: {
      concessaoId,
      nomeFalecido,
      biografia,
      dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
      dataFalecimento: dataFalecimento ? new Date(dataFalecimento) : null,
    },
  });

  revalidatePath(`/memorial/${memorial.id}`);
  revalidatePath(`/admin/concessoes`);
  return { success: true, memorial };
}

export async function addFotoMemorial(memorialId: string, url: string) {
    // Verificar limite de 10 fotos
    const count = await prisma.fotoMemorial.count({ where: { memorialId } });
    if (count >= 10) throw new Error("Limite de 10 fotos atingido.");

    return await prisma.fotoMemorial.create({
        data: {
            memorialId,
            urlFoto: url,
            ordem: count,
        }
    });
}
