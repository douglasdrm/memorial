import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  return NextResponse.json({
    isLoggedIn: !!session,
    user: session?.user ? {
      name: session.user.name,
      email: session.user.email,
      role: (session.user as any).role,
    } : null,
    rawSession: session
  });
}
