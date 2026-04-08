import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("p") || "memorial123";
  const hash = await bcrypt.hash(password, 10);
  return NextResponse.json({ password, hash });
}
