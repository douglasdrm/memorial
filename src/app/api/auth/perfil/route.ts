import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ tipo: null, status: null }, { status: 401 });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email: user.email },
    select: { tipo: true, status: true },
  });

  return NextResponse.json(usuario ?? { tipo: null, status: null });
}
