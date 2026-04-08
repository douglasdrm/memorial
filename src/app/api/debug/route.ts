import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.usuario.count();
    return NextResponse.json({ 
      status: "ok", 
      usuarios: count,
      dbUrl: process.env.DATABASE_URL?.substring(0, 50) + "...",
      tlsReject: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
      authUrl: process.env.AUTH_URL,
    });
  } catch (err: any) {
    return NextResponse.json({ 
      status: "error", 
      message: err.message,
      code: err.code,
    }, { status: 500 });
  }
}
