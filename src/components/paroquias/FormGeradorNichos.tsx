"use client";

import { useState } from "react";
import { Plus, X, Loader2, Wand2 } from "lucide-react";
import { generateNichos } from "@/lib/actions/nichos";

interface Props {
  paroquiaId: string;
}

export default function FormGeradorNichos({ paroquiaId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.append("paroquiaId", paroquiaId);

    try {
      await generateNichos(formData);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao gerar nichos");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-sage-600 hover:bg-sage-900 text-white px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center gap-2 shadow-md transition-all font-sans"
      >
        <Wand2 className="w-4 h-4" />
        Gerar Nichos em Massa
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 font-sans">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-cream-900/50 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="p-8 border-b border-cream-900/30 flex items-center justify-between bg-cream-50/50">
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl text-ink-900">Gerador Automático</h3>
                <p className="text-xs text-ink-500 font-medium uppercase tracking-wider">Criação rápida de unidades físicas</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-peach-100 text-ink-500 hover:text-red-500 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Prefixo (Ex: Ala A, Lado Norte...)</label>
                <input 
                  name="prefixo"
                  required
                  placeholder="Ala A"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Andar de Destino</label>
                  <select 
                    name="andar"
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n}º Andar</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Quantidade</label>
                  <input 
                    name="quantidade"
                    type="number"
                    min="1"
                    max="200"
                    defaultValue="50"
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Preço para este Andar (R$)</label>
                <input 
                  name="preco"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 2500.00"
                  required
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 border border-cream-900/50 rounded-xl text-xs uppercase font-bold tracking-widest text-ink-500 hover:bg-cream-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-sage-600 hover:bg-sage-900 text-white px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Gerar Unidades"
                  )}
                </button>
              </div>

              <p className="text-[10px] text-ink-500 text-center uppercase tracking-widest font-bold opacity-60">
                Os nichos serão criados como "Disponíveis" para venda pública.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
