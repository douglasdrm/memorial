import { NextRequest, NextResponse } from "next/server";
import { generateQrDataUrl } from "@/lib/utils/qrcode";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json({ error: "No text provided" }, { status: 400 });
  }

  const qr = await generateQrDataUrl(text);

  return NextResponse.json({ qr });
}
