"use client";

import { Check, Info } from "lucide-react";

interface Props {
  nichosPorAndar: any;
  paroquiaId: string;
  onSelect: (nicho: any) => void;
  selectedId?: string;
}

export default function NicheSelectionMap({ nichosPorAndar, paroquiaId, onSelect, selectedId }: Props) {
  return (
    <div className="flex flex-col gap-12">
      {Object.entries(nichosPorAndar).sort((a, b) => Number(b[0]) - Number(a[0])).map(([andar, nichos]: [string, any]) => (
        <div key={andar} className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
              <span className="bg-ink-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-serif text-lg">{andar}º</span>
              <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-ink-500">Pavimento / Andar</h3>
              <div className="flex-1 border-t border-cream-900/30"></div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
            {nichos.map((nicho: any) => {
              const isOcupado = nicho.status === "OCUPADO" || nicho.status === "CONCEDIDO";
              const isSelected = selectedId === nicho.id;

              return (
                <button
                  key={nicho.id}
                  disabled={isOcupado}
                  onClick={() => onSelect(nicho)}
                  className={`
                    aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all relative group
                    ${isOcupado 
                        ? 'bg-ink-50 border-ink-100 opacity-40 cursor-not-allowed' 
                        : isSelected 
                            ? 'bg-sage-600 border-sage-800 shadow-lg scale-110 z-10' 
                            : 'bg-white border-cream-900/50 hover:border-sage-500 hover:shadow-md'
                    }
                  `}
                >
                  {isOcupado && <div className="absolute inset-0 flex items-center justify-center opacity-10"><Info className="w-6 h-6" /></div>}
                  
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-white/80' : 'text-ink-400'}`}>
                    {nicho.identificador.split('-')[1]}
                  </span>
                  
                  {isSelected && <Check className="w-4 h-4 text-white animate-in zoom-in" />}
                  {!isSelected && !isOcupado && (
                      <span className="text-[9px] font-bold text-sage-600 opacity-60">R$ {Math.round(nicho.preco/1000)}k</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
