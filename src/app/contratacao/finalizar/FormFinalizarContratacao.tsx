"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, Heart, User } from "lucide-react";
import { finalizarContratacao } from "@/lib/actions/contratacao";

interface Props {
  nichoId: string;
}

export default function FormFinalizarContratacao({ nichoId }: Props) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await finalizarContratacao(formData);
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao processar sua solicitação.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      
      {/* Niche ID Hidden */}
      <input type="hidden" name="nichoId" value={nichoId} />

      {/* Section: Family Info */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-cream-900/50 flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-sage-600">
                <User className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-serif text-2xl text-ink-900">Responsável Familiar</h3>
                <p className="text-xs text-ink-500 font-medium">Dados para emissão do contrato e acesso ao sistema</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Nome Completo</label>
                <input name="familia_nome" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">E-mail</label>
                <input name="familia_email" type="email" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">CPF / Identidade</label>
                <input name="familia_cpf" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">WhatsApp / Telefone</label>
                <input name="familia_telefone" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
            </div>
        </div>
      </div>

      {/* Section: Deceased Info */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-cream-900/50 flex flex-col gap-8">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-peach-50 rounded-xl flex items-center justify-center text-peach-600">
                <Heart className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
                <h3 className="font-serif text-2xl text-ink-900">Dados do Homenageado</h3>
                <p className="text-xs text-ink-500 font-medium">Informações para criação do memorial digital</p>
            </div>
        </div>

        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Nome Completo do Falecido</label>
                <input name="falecido_nome" placeholder="Homenageado" className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Data de Nascimento</label>
                    <input name="falecido_nascimento" type="date" className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Data de Falecimento (Se houver)</label>
                    <input name="falecido_falecimento" type="date" className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition" />
                </div>
            </div>
            <p className="text-[10px] text-ink-400 italic">Esses dados podem ser alterados ou complementados posteriormente pela família.</p>
        </div>
      </div>

      {/* Payment Placeholder & Submit */}
      <div className="flex flex-col gap-6">
        <div className="p-6 bg-sage-50 border border-sage-500/20 rounded-2xl flex items-start gap-4">
            <div className="w-5 h-5 mt-0.5"><CheckCircle2 className="w-5 h-5 text-sage-600" /></div>
            <p className="text-xs text-sage-900/80 leading-relaxed font-medium">
                Ao clicar no botão abaixo, você declara estar de acordo com os termos de concessão da paróquia e será direcionado para o pagamento e geração do recibo.
            </p>
        </div>

        <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-sage-900 text-white py-6 rounded-[2rem] text-sm uppercase font-bold tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:bg-ink-900 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
        >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Finalizar e Ver Recibo"}
        </button>
      </div>

    </form>
  );
}
