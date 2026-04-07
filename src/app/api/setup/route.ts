import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const existingAdmin = await prisma.usuario.findUnique({
      where: { email: "admin@memorial.com" },
    });

    const hashedPassword = await bcrypt.hash("123456", 10);

    if (existingAdmin) {
      await prisma.usuario.update({
        where: { email: "admin@memorial.com" },
        data: { 
          senhaHash: hashedPassword,
          tipo: "ADMIN_GERAL"
        }
      });
      return NextResponse.json({ message: "Senha do Admin atualizada com sucesso." });
    }

    const newAdmin = await prisma.usuario.create({
      data: {
        nome: "Diretoria Paroquial",
        email: "admin@memorial.com",
        senhaHash: hashedPassword,
        tipo: "ADMIN_GERAL",
      },
    });

    return NextResponse.json({
      message: "Usuário teste criado com sucesso",
      user: { id: newAdmin.id, email: newAdmin.email },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
