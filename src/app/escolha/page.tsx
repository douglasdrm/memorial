import Image from "next/image";
import Link from "next/link";

export default function EscolhaNichoPage() {
  return (
    <div className="min-h-screen bg-cream-500 font-sans text-ink-900 flex flex-col items-center pt-8 pb-20 relative overflow-hidden">
      
      {/* Decoração da página (Flores no canto) */}
      <div className="absolute right-0 bottom-0 opacity-80 pointer-events-none z-0">
         <div className="w-96 h-96 bg-gradient-to-tl from-cream-900/50 rounded-full blur-3xl absolute bottom-0 right-0"></div>
         <span className="text-[12rem] absolute -bottom-10 -right-10 opacity-10">🌸</span>
      </div>

      {/* Navegação Topo */}
      <nav className="w-full max-w-7xl px-6 flex items-center justify-between mb-10 z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-8 h-10 border-[2px] border-ink-900 rounded-t-full flex items-center justify-center relative shadow-sm">
              <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-2"></div>
            </div>
            <h1 className="font-serif text-xl leading-none uppercase tracking-wide">Memorial<br />Paroquial</h1>
          </Link>
        </div>
        
        <ul className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest font-semibold text-ink-500">
          <li><Link href="/" className="hover:text-sage-600 transition">O Memorial</Link></li>
          <li><Link href="/paroquias" className="hover:text-sage-600 transition">Paróquias</Link></li>
          <li><Link href="/escolha" className="text-sage-600 transition">Escolha do Nicho</Link></li>
          <li><Link href="/memorial" className="hover:text-sage-600 transition">Memorial Digital</Link></li>
          <li><Link href="/homenagens" className="hover:text-sage-600 transition">Homenagens</Link></li>
          <li><Link href="/login" className="px-4 py-2 bg-sage-600 text-white rounded hover:bg-sage-900 transition">Acesso do Cliente</Link></li>
        </ul>
      </nav>

      {/* Main Grid */}
      <div className="w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        
        {/* Left Column (Memorial & Pricing) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <h2 className="font-serif text-3xl text-ink-900 border-b border-cream-900 pb-2">Reserva do Nicho</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 flex flex-col gap-6">
            
            {/* Price Grid Selector */}
            <h3 className="font-serif text-xl text-ink-900">Selecione o Andar (Matriz São Geraldo)</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { and: "1º Andar", price: "R$ 190" },
                { and: "2º Andar", price: "R$ 217" },
                { and: "3º Andar", price: "R$ 235" },
                { and: "4º Andar", price: "R$ 235" },
                { and: "5º Andar", price: "R$ 217" },
                { and: "6º Andar", price: "R$ 190" },
              ].map((item, idx) => (
                <div key={idx} className={`border rounded-xl overflow-hidden flex flex-col cursor-pointer transition ${idx === 0 ? 'border-sage-600 bg-sage-50/30' : 'border-cream-900/50 bg-white hover:border-sage-500'}`}>
                  <div className={`${idx === 0 ? 'bg-sage-600 text-white' : 'bg-cream-50/50 text-ink-500'} text-center py-2 text-[10px] font-semibold uppercase tracking-wider transition`}>{item.and}</div>
                  <div className="flex-1 flex items-center justify-center py-4 text-ink-900 font-serif text-lg">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Contract Details */}
                <div className="bg-cream-50 border border-cream-900/40 rounded-2xl p-5 flex flex-col gap-3">
                    <h4 className="font-serif text-lg text-ink-900 mb-1">Condições da Concessão</h4>
                    <ul className="text-sm text-ink-500 flex flex-col gap-2 font-medium">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-500"></div> Contrato de 3 anos</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-500"></div> Pagamento anual</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-500"></div> Renovação automática</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sage-500"></div> Valores já incluem manutenção</li>
                    </ul>
                </div>

                {/* Taxa de Adesão */}
                <div className="bg-sage-50/50 border border-sage-500/30 rounded-2xl p-5 flex flex-col">
                    <h4 className="font-serif text-lg text-sage-900 mb-1">Taxa de Adesão <span className="font-sans font-bold float-right">R$ 497</span></h4>
                    <p className="text-xs text-ink-500 mt-2 leading-relaxed">
                      Valor único destinado exclusivamente à implantação do Memorial Paroquial, incluindo obras, adequações, arquitetura, e sistemas.
                    </p>
                    <div className="mt-auto pt-4 flex gap-2">
                        <span className="bg-white text-sage-900 text-[10px] px-2 py-1 rounded border border-sage-200 font-bold uppercase">3x no Cartão</span>
                        <span className="bg-white text-sage-900 text-[10px] px-2 py-1 rounded border border-sage-200 font-bold uppercase">Não recorrente</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-cream-900/40 flex flex-col items-center">
              <p className="text-xs text-ink-500 text-center max-w-lg mb-6">
                A implantação do Memorial Paroquial ocorrerá quando atingirmos 60% de adesão, garantindo a execução da obra sem dependência de investidores.
              </p>
              <button className="bg-sage-600 hover:bg-sage-900 text-white w-full max-w-sm rounded-xl py-4 uppercase font-bold tracking-widest text-sm transition shadow-md shadow-sage-900/20">
                Fazer Pré-Cadastro
              </button>
            </div>

          </div>
        </div>

        {/* Right Column (Demonstração do Memorial & Homenagens) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <h2 className="font-serif text-3xl text-ink-900 border-b border-cream-900 pb-2">Memorial Digital</h2>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-900/50 flex flex-col">
            <p className="text-xs text-ink-500 mb-4 text-center">
              Incluso na sua concessão. Cada família terá acesso a um Portal do Cliente com memorial humano e espiritual.
            </p>
            <div className="flex gap-4 items-center bg-cream-50 p-4 rounded-2xl border border-cream-900/30 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-cream-900 shadow-sm relative">
                <Image src="/joao.png" alt="João da Silva" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-lg text-ink-900">João da Silva</h2>
                <div className="text-sage-600 text-[10px] tracking-widest font-medium">19/01/1938 - 06/03/2022</div>
              </div>
            </div>

            <h3 className="font-serif text-lg text-ink-900 mb-3 text-center">Formas de Pagamento</h3>
            <ul className="text-xs text-ink-500 flex flex-col gap-3 font-medium bg-cream-50 p-4 rounded-2xl border border-cream-900/30">
               <li className="flex justify-between border-b border-cream-900/30 pb-2">Cartão de Crédito <span>(Anual)</span></li>
               <li className="flex justify-between border-b border-cream-900/30 pb-2 text-sage-900 font-bold">Pix Anual <span>(5% Desconto)</span></li>
               <li className="flex justify-between">Taxa de Adesão <span>(Parcelada)</span></li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}
