"use client";

import { useState } from "react";
import { QrCode, X, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Props {
  url: string;
  identificador: string;
}

export default function NichoQrModal({ url, identificador }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);

  async function handleOpen() {
    setIsOpen(true);
    // Chamando a rota de API que gera o QR Code
    try {
        const response = await fetch(`/api/qrcode?text=${encodeURIComponent(url)}`);
        const data = await response.json();
        setQrData(data.qr);
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
    }
  }

  return (
    <>
      <button 
        onClick={handleOpen}
        className="p-1.5 hover:bg-sage-50 rounded-lg text-ink-300 hover:text-sage-600 transition shadow-sm border border-cream-900/10"
        title="Gerar QR Code"
      >
        <QrCode className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-ink-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 relative shadow-2xl flex flex-col items-center gap-6">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-ink-300 hover:text-ink-900">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
                <h3 className="font-serif text-2xl text-ink-900">QR Code da Unidade</h3>
                <p className="text-[10px] uppercase font-bold text-ink-400 tracking-widest">{identificador}</p>
            </div>

            <div className="w-64 h-64 bg-cream-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-cream-900/30 overflow-hidden relative">
                {qrData ? (
                    <Image src={qrData} alt="QR Code" fill className="p-4" />
                ) : (
                    <div className="animate-pulse flex flex-col items-center gap-2">
                        <QrCode className="w-10 h-10 text-ink-200" />
                        <span className="text-[9px] uppercase font-bold text-ink-300 tracking-widest">Gerando...</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3 w-full">
                <a 
                    href={qrData || "#"} 
                    download={`QR_${identificador}.png`}
                    className="w-full bg-sage-600 text-white py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-sage-900 transition shadow-lg"
                >
                    <Download className="w-4 h-4" /> Baixar Imagem
                </a>
                <a 
                    href={url} 
                    target="_blank"
                    className="w-full bg-white border border-cream-900/30 text-ink-500 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:shadow-md transition"
                >
                    <ExternalLink className="w-4 h-4" /> Testar Link
                </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
