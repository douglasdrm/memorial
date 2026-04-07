import QRCode from "qrcode";

export async function generateQrDataUrl(text: string) {
  try {
    return await QRCode.toDataURL(text, {
      margin: 2,
      width: 400,
      color: {
        dark: "#1e293b", // Slate 800 (ink)
        light: "#ffffff",
      },
    });
  } catch (err) {
    console.error("QR Code Generation Error:", err);
    return null;
  }
}
