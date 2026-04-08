import { Search, MapPin, HandHeart, Church, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "@/components/home/SearchInput";
import LeadsForm from "@/components/home/LeadsForm";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink-900">
      
      {/* Navigation */}
      <nav className="h-20 border-b border-cream-900/10 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-5 h-8 border border-ink-900 rounded-t-full flex items-center justify-center relative group-hover:bg-ink-900 transition-colors">
              <div className="w-1 h-1 rounded-full bg-ink-900 group-hover:bg-white absolute top-2"></div>
            </div>
            <span className="font-serif text-sm uppercase tracking-[0.2em] font-medium">Memorial Paroquial</span>
        </Link>
        <div className="flex items-center gap-8">
            <Link href="#como-funciona" className="text-[10px] uppercase font-bold tracking-widest text-ink-500 hover:text-sage-600 transition">Como Funciona</Link>
            <Link href="#paroquias" className="text-[10px] uppercase font-bold tracking-widest text-ink-500 hover:text-sage-600 transition">Paróquias</Link>
            <Link 
                href="/portal/login" 
                className="bg-sage-600 text-white px-6 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-sage-900 transition-all shadow-md"
            >
                Acessar Portal
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex flex-col items-center justify-center text-center gap-10 px-6 md:px-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <Image 
                src="/hero_memorial_bg_v2_1775582723889.png" 
                alt="Background Memorial"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-ink-900/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="flex items-center gap-4 text-white/80 animate-in fade-in duration-700">
                 <div className="h-[1px] w-12 bg-white/20"></div>
                 <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage-200">Cuidado Perpétuo e Fé</span>
                 <div className="h-[1px] w-12 bg-white/20"></div>
            </div>
            
            <h1 className="font-serif text-5xl md:text-8xl max-w-4xl leading-[1.05] tracking-tight text-white animate-in slide-in-from-bottom duration-1000">
                A memória de quem você ama, <span className="italic text-sage-300 font-light">eternizada na sua fé.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-sage-100/70 max-w-2xl font-medium leading-relaxed">
                Um ecossistema digital que conecta paróquias, famílias e homenagens em um espaço sagrado de recordação.
            </p>

            <SearchInput />
        </div>
      </section>

      {/* Benefits for Parishes (Multi-tenant value) */}
      <section id="como-funciona" className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6 p-10 bg-cream-50 rounded-[3rem] border border-cream-900/10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sage-600 shadow-sm">
                    <Church className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-ink-900">Gestão Paroquial</h3>
                <p className="text-sm text-ink-500 leading-relaxed">Painel administrativo inteligente para controle de nichos, vendas e contratos em um só lugar.</p>
          </div>
          <div className="flex flex-col gap-6 p-10 bg-cream-50 rounded-[3rem] border border-cream-900/10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sage-600 shadow-sm">
                    <HandHeart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-ink-900">Acolhimento Digital</h3>
                <p className="text-sm text-ink-500 leading-relaxed">Memoriais públicos exclusivos onde a comunidade pode acender velas e enviar flores em tributo.</p>
          </div>
          <div className="flex flex-col gap-6 p-10 bg-cream-50 rounded-[3rem] border border-cream-900/10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sage-600 shadow-sm">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-ink-900">Portal da Família</h3>
                <p className="text-sm text-ink-500 leading-relaxed">Área restrita para os responsáveis gerenciarem homenagens e aprovarem mensagens de carinho.</p>
          </div>
      </section>

      {/* Leads / Interest Form for Organizations */}
      <section id="quer-participar" className="py-24 bg-sage-900 text-white relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="flex flex-col gap-8">
                    <h2 className="font-serif text-4xl md:text-6xl leading-tight">Sua paróquia unida <br/><span className="text-sage-300">pelo cuidado e memória.</span></h2>
                    <p className="text-sage-100/70 text-lg md:text-xl leading-relaxed">
                        Temos um sistema completo para igrejas que buscam modernizar a gestão de seus columbários e oferecer um memorial digital de alto nível às famílias.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-sage-200">
                            <HandHeart className="w-5 h-5" /> <span>Transparência total na gestão de nichos</span>
                        </div>
                        <div className="flex items-center gap-3 text-sage-200">
                            <HandHeart className="w-5 h-5" /> <span>Homenagens digitais por e-commerce</span>
                        </div>
                    </div>
                </div>

                <LeadsForm />
           </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-20 border-t border-cream-900/10 text-center flex flex-col items-center gap-8">
           <div className="w-10 h-16 border border-ink-900/20 rounded-t-full flex items-center justify-center relative">
              <div className="w-2 h-2 rounded-full bg-ink-900/20 absolute top-4"></div>
           </div>
           <span className="font-serif text-[10px] uppercase tracking-[0.4em] text-ink-900/30">© 2026 Memorial Paroquial — West Print</span>
      </footer>

    </div>
  );
}
