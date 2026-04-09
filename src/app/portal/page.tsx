import { getMinhasConcessoes } from "@/lib/actions/familia_scoped";
import Link from "next/link";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Settings, 
  Edit3, 
  ExternalLink,
  BookOpen
} from "lucide-react";

export default async function PortalDashboardPage() {
  const concessoes = await getMinhasConcessoes();

  return (
    <div className="min-h-screen bg-cream-500 font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-sage-600 tracking-[0.3em]">Homenagem Particular</span>
                <h1 className="font-serif text-4xl text-ink-900 tracking-wide italic">Minhas Memórias</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right hidden md:flex flex-col">
                    <span className="text-xs font-bold text-ink-900 leading-none">Status da Conta</span>
                    <span className="text-[10px] text-sage-600 uppercase font-bold mt-1">Titular Ativo</span>
                </div>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sage-600 shadow-sm border border-cream-900/30">
                    <Settings className="w-5 h-5" />
                </div>
            </div>
        </header>

        {/* Content Section */}
        {concessoes.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-cream-900/50 shadow-sm flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-cream-50 rounded-full flex items-center justify-center text-4xl">⏳</div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-2xl text-ink-900">Aguardando seu primeiro memorial</h3>
                    <p className="text-sm text-ink-500 max-w-sm">
                        Assim que a sua contratação for processada pela paróquia, seu memorial aparecerá aqui para ser editado.
                    </p>
                </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {concessoes.map((c) => {
                    const memorial = c.memoriais[0]; // Pega o memorial vinculado à concessão
                    if (!memorial) return null;

                    return (
                        <div 
                            key={c.id}
                            className="bg-white rounded-[2.5rem] shadow-xl border border-cream-900/50 overflow-hidden flex flex-col group transition-all hover:shadow-2xl"
                        >
                            {/* Card Header & Photo Placeholder */}
                            <div className="h-48 bg-cream-50 relative flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-sage-900/5 group-hover:bg-sage-900/0 transition-colors"></div>
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-ink-100 shadow-inner group-hover:scale-110 transition-transform">
                                    <Heart className="w-10 h-10 fill-current opacity-20" />
                                </div>
                                <div className="absolute bottom-4 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-cream-900/30 text-[10px] font-bold text-ink-600 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-sage-600" /> Nicho {c.nicho.identificador}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-8 flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <h2 className="font-serif text-3xl text-ink-900">{memorial.nomeFalecido}</h2>
                                    <p className="text-xs text-ink-500 font-medium italic">{c.nicho.paroquia.nome}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pb-6 border-b border-cream-900/10">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-ink-400 uppercase font-bold tracking-widest">Status Digital</span>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${memorial.status === 'PRIVADO' ? 'text-peach-600' : 'text-sage-600'}`}>
                                            {memorial.status === 'PRIVADO' ? 'Rascunho Privado' : 'Homenagem Pública'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-ink-400 uppercase font-bold tracking-widest">Início</span>
                                        <span className="text-[10px] font-bold uppercase text-ink-900 tracking-widest">
                                            {new Date(c.dataInicio).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link 
                                        href={`/portal/memorial/${memorial.id}`}
                                        className="flex-1 bg-sage-900 text-white flex items-center justify-center gap-2 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest transition hover:bg-ink-900 active:scale-95 shadow-lg"
                                    >
                                        <Edit3 className="w-4 h-4" /> Editar Memorial
                                    </Link>
                                    <Link 
                                        href={`/memorial/${memorial.slug || memorial.id}`}
                                        target="_blank"
                                        className="w-14 h-14 bg-cream-50 rounded-2xl flex items-center justify-center text-ink-500 hover:text-sage-600 hover:bg-sage-50 transition border border-cream-900/30"
                                        title="Visualizar Público"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

        {/* Support Section */}
        <footer className="mt-10 p-8 bg-white/50 rounded-[2.5rem] border border-cream-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage-600 shadow-sm">
                    <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-ink-900 uppercase tracking-widest">Dúvidas ao escrever?</span>
                    <p className="text-xs text-ink-500">Confira nosso guia de como celebrar a história de quem você ama.</p>
                </div>
            </div>
            <button className="px-8 py-3 bg-white border border-cream-900/30 rounded-xl text-[10px] uppercase font-bold tracking-widest text-ink-500 hover:bg-cream-50 transition">
                Suporte ao Usuário
            </button>
        </footer>

      </div>
    </div>
  );
}
