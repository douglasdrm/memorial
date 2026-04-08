import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ status: "error", message: "Usuário não encontrado" });
    }

    if (!user.senhaHash) {
      return NextResponse.json({ status: "error", message: "Usuário sem senha definida" });
    }

    const isValid = await bcrypt.compare(password, user.senhaHash);

    return NextResponse.json({
      status: isValid ? "ok" : "invalid_password",
      userId: user.id,
      email: user.email,
      tipo: user.tipo,
      hashPrefix: user.senhaHash.substring(0, 10),
    });
  } catch (err: any) {
    return NextResponse.json({
      status: "error",
      message: err.message,
    }, { status: 500 });
  }
}
