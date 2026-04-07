import { prisma } from "@/lib/prisma";
import { generateQrDataUrl } from "@/lib/utils/qrcode";
import Image from "next/image";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ImprimirQrPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const nicho = await prisma.nicho.findUnique({
    where: { id },
    include: {
      paroquia: true,
      concessoes: {
        include: {
          memoriais: true
        },
        where: { status: 'ATIVO' },
        take: 1
      }
    },
  });

  if (!nicho) return notFound();

  // URL do memorial
  // Usamos localhost em dev, mas em prod usamos o domínio real. 
  // O ideal seria passar por env, mas para o print vamos usar o ID direto.
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const memorialUrl = `${baseUrl}/memorial/${nicho.id}`;
  const qrCodeBase64 = await generateQRCode(memorialUrl);

  const memorialAtivo = nicho.concessoes[0]?.memoriais[0];

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center py-10 print:py-0 print:bg-white">
      {/* Botões de Ação (Escondidos na impressão) */}
      <div className="flex gap-4 mb-10 print:hidden">
        <Link 
            href="/admin/paroquias" 
            className="flex items-center gap-2 px-6 py-3 bg-cream-50 text-ink-500 rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-cream-100 transition shadow-sm"
        >
            <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-3 bg-sage-600 text-white rounded-xl text-xs uppercase font-bold tracking-widest hover:bg-sage-900 transition shadow-lg"
        >
            <Printer className="w-4 h-4" /> Imprimir Agora
        </button>
      </div>

      {/* Área da Etiqueta / Documento */}
      <div className="w-[210mm] min-h-[148mm] bg-white border border-cream-900/20 shadow-2xl p-16 flex flex-col items-center justify-between text-center relative overflow-hidden print:border-none print:shadow-none print:w-full print:h-screen">
        
        {/* Brasão Decorativo / Borda */}
        <div className="absolute top-0 left-0 w-full h-4 bg-sage-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-4 bg-sage-600"></div>
        
        {/* Topo: Nome da Paróquia */}
        <div className="flex flex-col gap-4 items-center">
            <div className="w-12 h-16 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative scale-125">
                <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-4"></div>
            </div>
            <div className="flex flex-col gap-1 mt-6">
                <h2 className="font-serif text-3xl uppercase tracking-widest text-ink-900 font-light">
                    {nicho.paroquia.nome}
                </h2>
                <div className="h-[1px] w-32 bg-ink-900/20 mx-auto mt-2"></div>
                <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-ink-400 mt-2">Memorial Digital</p>
            </div>
        </div>

        {/* Centro: QR Code */}
        <div className="flex flex-col items-center gap-8 py-10">
            <div className="p-4 bg-white border-2 border-sage-600 rounded-[2.5rem] shadow-sm relative">
                <div className="absolute -top-4 -right-4 bg-sage-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Printer className="w-5 h-5" />
                </div>
                <div className="w-64 h-64 relative">
                    <Image src={qrCodeBase64} alt="QR Code" fill />
                </div>
            </div>
            <p className="font-serif text-xl text-ink-900 italic max-w-sm leading-relaxed">
                "Aponte sua câmera para conhecer <br /> e homenagear esta história de fé."
            </p>
        </div>

        {/* Rodapé: Identificação do Nicho */}
        <div className="flex flex-col gap-2">
            <h3 className="font-serif text-4xl text-ink-900 font-light">
                {memorialAtivo ? memorialAtivo.nomeFalecido : "Aguardando Vínculo"}
            </h3>
            <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-ink-500 mt-2">
                <span>Nicho: <span className="text-ink-900">{nicho.identificador}</span></span>
                <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span>
                <span>Andar: <span className="text-ink-900">{nicho.andar}</span></span>
            </div>
        </div>

        {/* Assinatura Digital */}
        <div className="absolute bottom-8 right-16 opacity-30 text-[8px] uppercase font-bold tracking-widest text-ink-500 hidden print:block">
            memorial-paroquial.com.br
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          .min-h-screen { min-height: 0 !important; padding: 0 !important; }
          @page { size: auto; margin: 0mm; }
        }
      `}} />
    </div>
  );
}
