"use client";

import { useState } from "react";
import { Flame, Flower2, Heart, Send, X, Check } from "lucide-react";
import { submitComentario, submitVelaDigital, submitFloresDigital } from "@/lib/actions/homenagens_interativas";

interface Props {
  memorialId: string;
  nomeFalecido: string;
}

export default function TributeForm({ memorialId, nomeFalecido }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"VELA" | "FLOR" | "MENSAGEM" | null>(null);
  const [loading, setLoading] = useState(false);

  const candleOptions = [
    { dias: 1, preco: 9.90, label: "Vela de 1 Dia" },
    { dias: 7, preco: 49.90, label: "Sétimo Dia" },
    { dias: 30, preco: 149.90, label: "Vela Trinitária (30 dias)" },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("memorialId", memorialId);

    try {
      if (type === "MENSAGEM") {
        await submitComentario(formData);
      } else if (type === "VELA") {
        await submitVelaDigital(formData);
      } else if (type === "FLOR") {
        await submitFloresDigital(formData);
      }
      setIsOpen(false);
      setType(null);
      alert("Homenagem enviada com sucesso! Mensagens aguardam aprovação da família.");
    } catch (err) {
      alert("Erro ao enviar homenagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => { setType("VELA"); setIsOpen(true); }}
          className="bg-sage-600 hover:bg-sage-900 py-6 rounded-3xl text-white flex flex-col items-center gap-2 transition shadow-lg group"
        >
          <Flame className="w-8 h-8 group-hover:animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest pl-1">Acender Vela</span>
        </button>
        <button 
          onClick={() => { setType("FLOR"); setIsOpen(true); }}
          className="bg-white hover:bg-cream-50 py-6 rounded-3xl text-ink-900 border border-cream-900/50 flex flex-col items-center gap-2 transition shadow-lg group"
        >
          <Flower2 className="w-8 h-8 text-sage-600 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase font-bold tracking-widest pl-1">Enviar Flores</span>
        </button>
      </div>

      <button 
        onClick={() => { setType("MENSAGEM"); setIsOpen(true); }}
        className="w-full mt-4 text-[10px] uppercase font-bold text-sage-600 tracking-[0.2em] hover:text-sage-900 transition flex items-center justify-center gap-2"
      >
        <Heart className="w-4 h-4" /> Deixar uma mensagem de carinho
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => { setIsOpen(false); setType(null); }} className="absolute top-8 right-8 text-ink-300 hover:text-ink-900 transition">
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-3xl text-ink-900 mb-8">
              {type === "VELA" && "Acender Vela Digital"}
              {type === "FLOR" && "Enviar Flores"}
              {type === "MENSAGEM" && "Deixar Mensagem"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-ink-400 tracking-widest">Seu Nome / Identificação</label>
                <input name="autor" required name="autor" className="w-full px-4 py-3 bg-cream-50 border border-cream-900/20 rounded-xl outline-none focus:border-sage-500" placeholder="Ex: Família Souza Ramos" />
                {/* For candle/flower logic we might use nomeExibicao instead of autor in the action, but I'll map them */}
                <input type="hidden" name="nomeExibicao" /> 
              </div>

              {type === "VELA" && (
                <div className="grid grid-cols-1 gap-3">
                  {candleOptions.map((opt) => (
                    <label key={opt.dias} className="flex items-center justify-between p-4 border border-cream-900/20 rounded-2xl cursor-pointer hover:bg-sage-50 transition has-[:checked]:bg-sage-50 has-[:checked]:border-sage-500">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="dias" value={opt.dias} required className="accent-sage-600" />
                        <div className="flex flex-col">
                           <span className="text-sm font-bold">{opt.label}</span>
                           <span className="text-[10px] text-ink-400 uppercase font-bold tracking-widest">Duração: {opt.dias} {opt.dias === 1 ? 'dia' : 'dias'}</span>
                        </div>
                      </div>
                      <span className="font-serif text-lg text-sage-600">R$ {opt.preco.toFixed(2)}</span>
                      <input type="hidden" name="valor" value={opt.preco} />
                    </label>
                  ))}
                </div>
              )}

              {type === "MENSAGEM" && (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold text-ink-400 tracking-widest">Sua Mensagem</label>
                  <textarea name="conteudo" required rows={4} className="w-full px-4 py-3 bg-cream-50 border border-cream-900/20 rounded-xl outline-none focus:border-sage-500 resize-none italic font-serif" placeholder="Escreva palavras de conforto..." />
                </div>
              )}

              <button 
                disabled={loading}
                type="submit" 
                className="w-full bg-sage-600 hover:bg-sage-900 text-white py-4 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-3 transition-all disabled:opacity-50 shadow-xl mt-4"
              >
                {loading ? "Processando..." : (
                    <>
                        <Check className="w-4 h-4" /> 
                        {type === "MENSAGEM" ? "Publicar Homenagem" : "Confirmar e Pagar"}
                    </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
