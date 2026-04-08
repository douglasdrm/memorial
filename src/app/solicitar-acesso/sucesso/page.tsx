import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";

export default function SucessoSolicitacaoPage() {
  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10 text-center">
        
        <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-sage-600" size={40} />
        </div>

        <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest leading-tight mb-4">
          Solicitação Enviada
        </h1>
        
        <div className="flex items-start gap-3 bg-cream-50 p-4 rounded-xl text-left mb-8">
          <Clock className="text-ink-400 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-ink-900 text-sm font-bold mb-1">Aguardando Aprovação</p>
            <p className="text-ink-500 text-xs">
              Seu cadastro foi recebido com sucesso. Um administrador irá revisar sua solicitação. Você receberá um e-mail assim que seu acesso for liberado.
            </p>
          </div>
        </div>

        <Link 
          href="/login"
          className="block w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors"
        >
          Voltar para o Início
        </Link>

        <p className="text-ink-400 text-[10px] mt-6 leading-relaxed">
          Dica: Verifique sua caixa de spam se não receber o e-mail de confirmação em até 24 horas.
        </p>

      </div>
    </div>
  );
}
