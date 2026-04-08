import { getNichosByParoquia, getParoquiaById } from "@/lib/actions/nichos";
import Link from "next/link";
import { ArrowLeft, MapPin, Info, CheckCircle2 } from "lucide-react";
import NicheSelectionMap from "./NicheSelectionMap";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NicheMapSelectionPage({ params }: Props) {
  const { id } = await params;
  const paroquia = await getParoquiaById(id);
  const nichos = await getNichosByParoquia(id);

  if (!paroquia) {
    return <div className="p-20 text-center font-serif text-2xl">Paróquia não encontrada.</div>;
  }

  // Agrupar nichos por andar para o mapa
  const nichosPorAndar = nichos.reduce((acc: any, nicho) => {
    const andar = nicho.andar || 1;
    if (!acc[andar]) acc[andar] = [];
    acc[andar].push(nicho);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-cream-500 font-sans pb-20">
      
      {/* Dynamic Header */}
      <div className="bg-sage-900 pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
                <Link href="/contratacao" className="text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] transition">
                    <ArrowLeft className="w-4 h-4" /> Trocar Paróquia
                </Link>
                <div className="flex flex-col gap-1">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide italic">{paroquia.nome}</h1>
                    <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
                        <MapPin className="w-4 h-4 text-peach-500" />
                        {paroquia.endereco || "Memorial Local"}
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-white/80">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-serif">{nichos.filter(n => n.status === 'DISPONIVEL').length}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60">Disponíveis</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-serif">{nichos.length}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60">Total de Unidades</span>
                </div>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto -mt-16 px-6 relative z-10 w-full">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* The Map / Grid */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-cream-900/50">
                    <div className="p-8 border-b border-cream-900/10 flex items-center justify-between bg-cream-50/50">
                        <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-ink-900">Mapa de Ocupação em Tempo Real</h2>
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-2 text-[10px] font-bold text-ink-400 uppercase">
                                <span className="w-3 h-3 bg-sage-600 rounded-full"></span> Disponível
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-ink-400 uppercase">
                                <span className="w-3 h-3 bg-ink-900 rounded-full"></span> Ocupado
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        <NicheSelectionMap nichosPorAndar={nichosPorAndar} paroquiaId={paroquia.id} />
                    </div>
                </div>
            </div>

            {/* Selection Sidebar (Sticky) */}
            <aside className="lg:col-span-1">
                <div className="sticky top-10 flex flex-col gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-cream-900/30">
                        <div className="flex flex-col gap-6 text-center">
                            <div className="w-16 h-16 bg-cream-50 rounded-full flex items-center justify-center text-sage-600 mx-auto">
                                <Info className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-serif text-2xl text-ink-900">Selecione um Nicho</h3>
                                <p className="text-xs text-ink-500 font-medium">Clique no mapa ao lado para ver detalhes e iniciar o processo de contratação.</p>
                            </div>
                            
                            <div id="selection-details" className="hidden py-6 border-t border-cream-900/10 flex flex-col gap-4 text-left">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Nicho Escolhido</span>
                                    <span id="label-nicho" className="font-serif text-2xl text-sage-600">--</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-ink-400 uppercase tracking-widest">Andar / Pavimento</span>
                                    <span id="label-andar" className="text-sm font-bold text-ink-900">--</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-cream-900/10">
                                    <span className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Valor do Jazigo</span>
                                    <span id="label-preco" className="text-xl font-serif text-sage-900">R$ --</span>
                                </div>

                                <Link 
                                    id="btn-continuar"
                                    href="#" 
                                    className="w-full bg-sage-900 text-white py-4 rounded-xl text-xs uppercase font-bold tracking-widest shadow-xl flex items-center justify-center gap-3 transition hover:bg-ink-900 mt-4 active:scale-95"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Continuar Reserva
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-sage-50/50 p-6 rounded-[2rem] border border-sage-500/10 text-center">
                        <p className="text-[10px] text-sage-600 uppercase font-bold tracking-widest leading-loose">
                            Precisa de ajuda?<br/>
                            <span className="text-ink-900 opacity-60">(00) 0000-0000</span>
                        </p>
                    </div>
                </div>
            </aside>
         </div>
      </main>

    </div>
  );
}
