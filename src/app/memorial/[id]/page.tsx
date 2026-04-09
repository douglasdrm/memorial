import { getMemorialByConcessao } from "@/lib/actions/memoriais";
import { 
  Heart, 
  Flame, 
  Flower2, 
  Calendar, 
  MapPin, 
  Share2, 
  ChevronRight,
  User,
  Clock,
  Lock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TributeForm from "./TributeForm";
import { getPublicMemorial } from "@/lib/actions/memoriais";
import { getActiveHomenagens } from "@/lib/actions/homenagens_interativas";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicMemorialPage({ params }: Props) {
  const { id } = await params;
  const memorial = await getPublicMemorial(id);

  if (!memorial) return notFound();

  // Verificar Privacidade
  const isPrivado = memorial.status === "PRIVADO";
  
  if (isPrivado) {
    return (
        <div className="min-h-screen bg-cream-500 flex flex-col items-center justify-center p-6 text-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-peach-500 shadow-xl">
                <Lock className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl text-ink-900">Memorial Privado</h1>
                <p className="text-sm text-ink-500 max-w-sm">Esta homenagem está sendo preparada pela família e será publicada em breve.</p>
            </div>
            <Link href="/" className="text-[10px] uppercase font-bold tracking-widest text-ink-400 hover:text-sage-600 transition">Voltar ao Início</Link>
        </div>
    );
  }

  const activeHomenagens = await getActiveHomenagens(memorial.id);
  const approvedMessages = memorial.mensagens.filter(m => m.status === "APROVADO");
  const highlightPhoto = memorial.fotos[0]?.urlFoto;

  return (
    <div className="min-h-screen bg-cream-500 font-sans selection:bg-sage-100 selection:text-sage-900">
      
      {/* Navigation / Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-5 h-8 border border-ink-900 rounded-t-full flex items-center justify-center relative group-hover:bg-ink-900 transition-colors">
              <div className="w-1 h-1 rounded-full bg-ink-900 group-hover:bg-white absolute top-2"></div>
            </div>
            <span className="font-serif text-sm uppercase tracking-[0.2em] text-ink-900 font-medium">Memorial Paroquial</span>
        </Link>
        <button className="p-2.5 bg-white border border-cream-900/50 rounded-full hover:shadow-md transition shadow-sm text-ink-500">
            <Share2 className="w-4 h-4" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Photos & Tributes */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                
                {/* Highlight Photo */}
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                    {highlightPhoto ? (
                        <Image 
                            src={highlightPhoto} 
                            alt={memorial.nomeFalecido}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-cream-100 flex items-center justify-center text-ink-500/20">
                            <User className="w-32 h-32" />
                        </div>
                    )}
                    
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-ink-900/40 to-transparent">
                         <div className="flex items-center gap-3 text-white">
                             <MapPin className="w-4 h-4 text-sage-300" />
                             <span className="text-xs font-bold uppercase tracking-widest leading-none">
                                {memorial.concessao.nicho.paroquia.nome}
                             </span>
                         </div>
                    </div>
                </div>

                {/* Tributos Interactive Form */}
                <TributeForm memorialId={memorial.id} nomeFalecido={memorial.nomeFalecido} />

                {/* Mural de Luz (Active Tributes) */}
                {activeHomenagens.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4 bg-white/40 p-8 rounded-[2.5rem] border border-cream-900/30">
                         <h4 className="text-[10px] font-bold text-ink-900 uppercase tracking-[0.2em] flex items-center gap-2">
                            Mural de Luz e Flores
                         </h4>
                         <div className="flex flex-wrap gap-2">
                             {activeHomenagens.map((h) => (
                                 <div key={h.id} className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full text-[10px] font-bold text-ink-700 shadow-sm border border-cream-900/20">
                                     {h.tipo === "VELA" ? <Flame className="w-3 h-3 text-peach-500" /> : <Flower2 className="w-3 h-3 text-sage-600" />}
                                     {h.nomeExibicao}
                                     {h.expiraEm && (
                                         <span className="opacity-40 font-normal">
                                             <Clock className="w-2.5 h-2.5 inline mx-1" />
                                             {new Date(h.expiraEm).toLocaleDateString('pt-BR')}
                                         </span>
                                     )}
                                 </div>
                             ))}
                         </div>
                    </div>
                )}
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 pt-4">
                <div className="flex flex-col gap-10">
                    
                    {/* Main Titles */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 text-sage-600 animate-in fade-in slide-in-from-bottom duration-700">
                             <div className="h-[1px] w-12 bg-sage-500/30"></div>
                             <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Homenagem Perpétua</span>
                             <div className="h-[1px] w-12 bg-sage-500/30"></div>
                        </div>

                        <h1 className="font-serif text-5xl md:text-7xl text-ink-900 leading-[1.1] animate-in fade-in duration-1000">
                            {memorial.nomeFalecido}
                        </h1>

                        <div className="flex items-center gap-8 text-ink-500 font-medium animate-in fade-in duration-1000 delay-200">
                            <div className="flex items-center gap-3 text-ink-400">
                                <Calendar className="w-5 h-5 opacity-40" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Nascimento</span>
                                    <span className="text-sm">{memorial.dataNascimento ? new Date(memorial.dataNascimento).toLocaleDateString('pt-BR') : '--'}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-ink-400">
                                <Calendar className="w-5 h-5 opacity-40" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">Falecimento</span>
                                    <span className="text-sm">{memorial.dataFalecimento ? new Date(memorial.dataFalecimento).toLocaleDateString('pt-BR') : '--'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biography */}
                    <div className="prose prose-stone max-w-none animate-in fade-in duration-1000 delay-500">
                        <h3 className="text-[10px] font-bold text-ink-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                           Trajetória e Lembranças
                           <div className="flex-1 h-[1px] bg-cream-900/30"></div>
                        </h3>
                        <p className="text-lg md:text-2xl text-ink-800 font-serif italic leading-[1.6] whitespace-pre-wrap mb-16">
                            "{memorial.biografia || "Recordamos com carinho a trajetória e os valores deixados por esta pessoa tão amada."}"
                        </p>
                    </div>

                    {/* Image Gallery (Mural de Fotos) */}
                    {memorial.fotos.length > 1 && (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000 delay-700">
                             <h3 className="text-[10px] font-bold text-ink-900 uppercase tracking-[0.3em] flex items-center gap-4">
                                Mural de Lembranças
                                <div className="flex-1 h-[1px] bg-cream-900/30"></div>
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {memorial.fotos.slice(1).map((f: any, idx: number) => (
                                    <div key={f.id} className={`relative aspect-square rounded-[2rem] overflow-hidden border-2 border-white shadow-lg transition-transform hover:scale-105 ${idx % 3 === 1 ? 'md:translate-y-6' : ''}`}>
                                        <Image 
                                            src={f.urlFoto}
                                            alt={`Foto ${idx + 2}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Condolences Board (Filtered) */}
                    {approvedMessages.length > 0 && (
                        <div className="mt-12 bg-white/40 backdrop-blur-sm rounded-[3rem] p-10 border border-cream-900/30 shadow-sm animate-in fade-in duration-1000 delay-700">
                             <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xs font-bold text-ink-900 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <Heart className="w-4 h-4 text-peach-500" /> Mural de Carinho
                                </h3>
                             </div>

                             <div className="flex flex-col gap-6">
                                {approvedMessages.map((msg) => (
                                    <div key={msg.id} className="p-8 bg-white rounded-[2.5rem] border border-cream-900/10 shadow-sm italic text-ink-700 text-sm md:text-base leading-relaxed">
                                        "{msg.conteudo}"
                                        <div className="mt-5 not-italic font-bold text-[10px] uppercase tracking-[0.2em] text-ink-400">
                                            — {msg.autor}
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="py-20 flex flex-col items-center gap-6 opacity-40 grayscale pointer-events-none">
          <div className="w-12 h-20 border border-ink-900 rounded-t-full flex items-center justify-center relative">
              <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-4"></div>
          </div>
          <span className="font-serif text-[10px] uppercase tracking-[0.5em] text-ink-900">In Memoria</span>
      </footer>

    </div>
  );
}
