"use server";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth/session";

export async function getMyParoquia() {
  const user = await getSessionUser();
  if (!user) return null;

  return await prisma.paroquia.findFirst({
    where: { adminId: user.id },
  });
}

export async function getMyNichos() {
    const paroquia = await getMyParoquia();
    if (!paroquia) return [];

    return await prisma.nicho.findMany({
        where: { paroquiaId: paroquia.id },
        include: { concessoes: { include: { familia: true } } },
        orderBy: [{ andar: "asc" }, { identificador: "asc" }]
    });
}

export async function getMyConcessoes() {
    const paroquia = await getMyParoquia();
    if (!paroquia) return [];

    return await prisma.concessao.findMany({
        where: { nicho: { paroquiaId: paroquia.id } },
        include: { familia: true, nicho: true },
        orderBy: { dataInicio: "desc" }
    });
}
