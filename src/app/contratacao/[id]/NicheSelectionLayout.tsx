"use client";

import { useState } from "react";
import { Info, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import NicheSelectionMap from "./NicheSelectionMap";

interface Props {
  nichosPorAndar: any;
  paroquiaId: string;
}

export default function NicheSelectionLayout({ nichosPorAndar, paroquiaId }: Props) {
  const [selectedNicho, setSelectedNicho] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
      {/* The Map */}
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
            <NicheSelectionMap 
                nichosPorAndar={nichosPorAndar} 
                paroquiaId={paroquiaId} 
                onSelect={setSelectedNicho}
                selectedId={selectedNicho?.id}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Details */}
      <aside className="lg:col-span-1">
        <div className="sticky top-10 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-cream-900/30">
            <div className="flex flex-col gap-6 text-center">
              <div className="w-16 h-16 bg-cream-50 rounded-full flex items-center justify-center text-sage-600 mx-auto">
                <Info className="w-8 h-8" />
              </div>
              
              {!selectedNicho ? (
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-2xl text-ink-900">Selecione um Nicho</h3>
                  <p className="text-xs text-ink-500 font-medium italic">Clique no mapa ao lado para ver detalhes e iniciar o processo de contratação.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-300">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl text-ink-900">Unidade Selecionada</h3>
                    <p className="text-[10px] text-sage-600 uppercase font-bold tracking-widest">{selectedNicho.identificador}</p>
                  </div>

                  <div className="py-6 border-y border-cream-900/10 flex flex-col gap-4 text-left">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-ink-400 uppercase tracking-widest">Pavimento</span>
                      <span className="font-bold text-ink-900 uppercase">{selectedNicho.andar}º Andar</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink-400 uppercase tracking-widest text-[10px]">Valor</span>
                      <span className="text-xl font-serif text-sage-900">
                        R$ {selectedNicho.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <Link 
                    href={`/contratacao/finalizar?nichoId=${selectedNicho.id}`}
                    className="w-full bg-sage-600 text-white py-4 rounded-xl text-[10px] uppercase font-bold tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition hover:bg-sage-900 active:scale-95 animate-pulse-slow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Continuar Reserva
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-sage-50/50 p-6 rounded-[2rem] border border-sage-500/10 text-center">
            <p className="text-[10px] text-sage-600 uppercase font-bold tracking-widest leading-loose">
              Precisa de ajuda?<br/>
              <span className="text-ink-900 opacity-60">Suporte Paroquial</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
