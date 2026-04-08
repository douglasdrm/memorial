import { getParoquiaById, getNichosByParoquia } from "@/lib/actions/nichos";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Landmark, ShieldCheck, Receipt } from "lucide-react";
import FormFinalizarContratacao from "./FormFinalizarContratacao";

interface Props {
  searchParams: Promise<{ nichoId?: string }>;
}

export default async function FinalizarContratacaoPage({ searchParams }: Props) {
  const { nichoId } = await searchParams;

  if (!nichoId) {
    return (
        <div className="p-20 text-center flex flex-col items-center gap-4">
            <h2 className="font-serif text-2xl">Nenhum nicho selecionado.</h2>
            <Link href="/contratacao" className="text-sage-600 font-bold uppercase tracking-widest text-xs">Voltar para seleção</Link>
        </div>
    );
  }

  // Buscar detalhes do nicho e paróquia
  const nicho = await prisma.nicho.findUnique({
    where: { id: nichoId },
    include: { paroquia: true }
  });

  if (!nicho) {
    return <div className="p-20 text-center font-serif text-2xl">Unidade não encontrada.</div>;
  }

  return (
    <div className="min-h-screen bg-cream-500 font-sans pb-20">
      
      {/* Refined Header */}
      <div className="bg-white border-b border-cream-900/30 py-8 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href={`/contratacao/${nicho.paroquiaId}`} className="text-ink-500 hover:text-sage-600 flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] transition">
                <ArrowLeft className="w-4 h-4" /> Voltar para o Mapa
            </Link>
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sage-600" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-ink-900">Ambiente Seguro</span>
            </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto mt-12 px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Reservation Summary */}
        <aside className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-sage-900 text-white rounded-[2.5rem] p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
                
                <div className="flex flex-col gap-1 relative z-10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">Resumo da Reserva</span>
                    <h2 className="font-serif text-3xl">Lote {nicho.identificador}</h2>
                    <p className="text-sm text-white/70">{nicho.paroquia.nome}</p>
                </div>

                <div className="flex flex-col gap-4 py-6 border-y border-white/10 relative z-10">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Pavimento</span>
                        <span className="text-sm font-medium">{nicho.andar}º Andar</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Status do Nicho</span>
                        <span className="text-xs px-2 py-0.5 bg-sage-500/20 text-sage-300 rounded-full border border-sage-500/30">Livre</span>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-center py-4 relative z-10">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Total a Pagar</span>
                    <span className="font-serif text-4xl text-sage-300">R$ {nicho.preco?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[9px] uppercase font-bold text-white/30 mt-2 tracking-widest">Opções de parcelamento disponíveis</span>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 border border-cream-900/30 flex items-center gap-4">
                <div className="w-12 h-12 bg-cream-50 rounded-xl flex items-center justify-center text-ink-900">
                    <Receipt className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-ink-900 uppercase tracking-widest leading-none">Emissão de Recibo</span>
                    <p className="text-[10px] text-ink-400 mt-1">Gerado automaticamente após a confirmação.</p>
                </div>
            </div>
        </aside>

        {/* Form Area */}
        <section className="lg:w-2/3 flex flex-col gap-8">
            <FormFinalizarContratacao nichoId={nicho.id} />
        </section>

      </main>

    </div>
  );
}
