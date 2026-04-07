"use client";

import { useState } from "react";
import { createInteresse } from "@/lib/actions/leads";
import { CheckCircle, Loader2 } from "lucide-react";

export default function LeadsForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createInteresse(formData);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Erro ao enviar.");
    }
    setIsPending(false);
  }

  if (success) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-sage-500/30 flex flex-col items-center gap-6 text-center animate-in zoom-in duration-500">
        <CheckCircle className="w-16 h-16 text-sage-400" />
        <div className="flex flex-col gap-2">
            <h4 className="font-serif text-2xl text-white">Recebemos seu interesse</h4>
            <p className="text-sage-100/70 text-sm">Em breve, nossa equipe entrará em contato para agendar uma demonstração.</p>
        </div>
        <button 
            onClick={() => setSuccess(false)}
            className="text-[10px] uppercase font-bold text-sage-300 tracking-widest hover:underline"
        >
            Enviar outro contato
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 flex flex-col gap-6">
      <h4 className="text-xs uppercase font-bold tracking-[0.3em] text-sage-300 border-b border-white/10 pb-4">Demonstração de Interesse</h4>
      
      {error && (
        <div className="bg-red-500/20 text-red-200 text-[10px] p-3 rounded-xl border border-red-500/30 uppercase font-bold tracking-widest">
            {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Sua Paróquia/Igreja</label>
          <input name="nomeIgreja" required className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition text-white" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Cidade</label>
          <input name="cidade" required className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition text-white" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Responsável</label>
            <input name="responsavel" required className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Telefone</label>
            <input name="telefone" required className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition text-white" />
          </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] uppercase font-bold text-white/50 tracking-widest">E-mail para Contato</label>
        <input name="email" type="email" required className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-sage-500 transition text-white" />
      </div>
      
      <button 
        type="submit"
        disabled={isPending}
        className="bg-sage-600 hover:bg-sage-500 text-white w-full py-4 mt-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Solicitar Visita/Proposta"}
      </button>
      <p className="text-[9px] text-white/40 text-center uppercase tracking-widest">Não é cobrança, entraremos em contato para entender sua realidade.</p>
    </form>
  );
}
