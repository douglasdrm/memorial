import Image from "next/image";
import Link from "next/link";

export default function ParoquiasPage() {
  return (
    <div className="min-h-screen bg-cream-500 font-sans text-ink-900 flex flex-col items-center pt-8 pb-20">
      
      {/* Navegação Topo */}
      <nav className="w-full max-w-7xl px-6 flex items-center justify-between mb-10">
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
          <li><Link href="/paroquias" className="text-sage-600 transition">Paróquias</Link></li>
          <li><Link href="/escolha" className="hover:text-sage-600 transition">Escolha do Nicho</Link></li>
          <li><Link href="/memorial" className="hover:text-sage-600 transition">Memorial Digital</Link></li>
          <li><Link href="/homenagens" className="hover:text-sage-600 transition">Homenagens</Link></li>
          <li><Link href="/login" className="px-4 py-2 bg-sage-600 text-white rounded hover:bg-sage-900 transition">Acesso do Cliente</Link></li>
        </ul>
      </nav>

      {/* Main Grid */}
      <div className="w-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Parish Focus) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-cream-900/50 flex flex-col">
            
            {/* Header / Imagem da Igreja */}
            <div className="w-full h-80 rounded-2xl overflow-hidden relative mb-8">
              <Image 
                src="/igreja.png" 
                alt="Matriz São Geraldo - Olaria" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <h2 className="absolute bottom-6 left-6 font-serif text-3xl text-white">Matriz São Geraldo – Olaria</h2>
            </div>
            
            {/* Mensagem e Apresentação */}
            <h3 className="font-serif text-xl text-ink-900 mb-3 px-2">Apresentação da Paróquia</h3>
            <p className="text-ink-500 text-sm leading-relaxed mb-6 px-2">
              Um ambiente de fé viva, onde a lembrança daqueles que partiram permanece presente e cuidada.
              Cada paróquia possui seu ambiente exclusivo. Toda receita é automaticamente vinculada à SPE da própria paróquia.
            </p>

            {/* Ocupação e Metricas */}
            <div className="grid grid-cols-3 gap-4 mb-4 mt-2">
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-900/30">
                <span className="text-ink-500 text-xs block mb-1">Capacidade Total</span>
                <span className="font-serif text-2xl text-ink-900">1.000</span>
              </div>
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-900/30">
                <span className="text-ink-500 text-xs block mb-1">Nichos Ocupados</span>
                <span className="font-serif text-2xl text-sage-900">750</span>
              </div>
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-900/30">
                <span className="text-ink-500 text-xs block mb-1">Nichos Disponíveis</span>
                <span className="font-serif text-2xl text-peach-900">250</span>
              </div>
            </div>

            {/* Progress Bar Visual de Ocupação */}
            <div className="px-2 mt-4 mb-8">
                <div className="flex justify-between text-[10px] uppercase font-bold text-ink-500 mb-2">
                    <span>Ocupação atual do Memorial</span>
                    <span>75% Ocupado</span>
                </div>
                <div className="w-full h-3 bg-cream-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sage-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
            </div>

            <Link href="/escolha" className="w-full text-center bg-sage-600 hover:bg-sage-900 text-white rounded-xl py-4 uppercase font-bold tracking-widest text-sm transition">
                Escolher meu nicho nesta paróquia
            </Link>

          </div>
        </div>

        {/* Right Column (Widget) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-sage-600 text-white rounded-3xl p-8 shadow-sm flex flex-col h-full bg-[url('/hero-bg.png')] bg-cover bg-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-sage-900/80 group-hover:bg-sage-900/90 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-4xl mb-4">🕊️</div>
              <h3 className="font-serif text-2xl mb-4">Missão Institucional</h3>
              <p className="text-sage-50 text-sm leading-relaxed mb-8 flex-grow">
                "O Memorial Paroquial é um espaço vivo de fé e memória, criado para cuidar das famílias, preservar a dignidade dos que partiram e fortalecer o vínculo da comunidade com a Igreja."
              </p>
              <button className="border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded py-3 uppercase text-xs tracking-widest font-bold transition">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
