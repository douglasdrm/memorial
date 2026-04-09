import { getMemorialById } from "@/lib/actions/familia_scoped";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Share2 } from "lucide-react";
import MemorialEditorTabs from "./MemorialEditorTabs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MemorialEditorPage({ params }: Props) {
  const { id } = await params;
  const memorial = await getMemorialById(id);

  return (
    <div className="min-h-screen bg-cream-500 font-sans pb-20">
      
      {/* Header Sticky Area */}
      <div className="bg-white border-b border-cream-900/30 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <Link href="/portal" className="p-2 hover:bg-cream-50 rounded-xl text-ink-500 transition border border-transparent hover:border-cream-900/30">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex flex-col">
                    <h1 className="font-serif text-2xl text-ink-900 leading-none">{memorial.nomeFalecido}</h1>
                    <div className="flex items-center gap-3 text-ink-400 text-[10px] uppercase font-bold tracking-widest mt-2">
                        <MapPin className="w-3 h-3 text-sage-600" /> {memorial.concessao.nicho.paroquia.nome}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col text-right mr-4">
                    <span className="text-[9px] uppercase font-bold text-ink-400 tracking-widest">Status da Homenagem</span>
                    <span className={`text-[10px] font-bold uppercase ${memorial.status === 'PRIVADO' ? 'text-peach-600' : 'text-sage-600'}`}>
                        {memorial.status === 'PRIVADO' ? 'Rascunho Privado' : 'Publicado Online'}
                    </span>
                </div>
                <Link 
                    href={`/memorial/${memorial.slug || memorial.id}`}
                    target="_blank"
                    className="flex items-center gap-2 bg-cream-50 hover:bg-sage-50 text-ink-500 hover:text-sage-600 px-6 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition border border-cream-900/10 shadow-sm"
                >
                    <ExternalLink className="w-3.5 h-3.5" /> Visualizar
                </Link>
                <button className="p-2.5 bg-sage-900 text-white rounded-xl shadow-lg hover:bg-ink-900 transition">
                    <Share2 className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto mt-10 px-6">
        <MemorialEditorTabs memorial={memorial} />
      </main>

    </div>
  );
}
