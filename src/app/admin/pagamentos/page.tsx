import { CreditCard, History, TrendingUp } from "lucide-react";

export default function PagamentosPlaceholder() {
  return (
    <div className="flex flex-col gap-10 font-sans">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Financeiro e Pagamentos</h2>
        <p className="text-ink-500 text-sm font-medium">Controle de taxas de manutenção e concessões (Em desenvolvimento)</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-cream-900/30 p-20 flex flex-col items-center gap-6 text-center shadow-sm">
        <div className="w-24 h-24 bg-peach-50 rounded-full flex items-center justify-center text-5xl">💰</div>
        <div className="flex flex-col gap-2">
            <h3 className="font-serif text-2xl text-ink-900">Módulo Financeiro</h3>
            <p className="text-sm text-ink-500 max-w-sm">
                Estamos preparando a integração com meios de pagamento. Aqui você poderá acompanhar os recebíveis e inadimplência.
            </p>
        </div>
      </div>
    </div>
  );
}
