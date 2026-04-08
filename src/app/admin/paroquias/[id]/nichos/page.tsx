import { getNichosByParoquia, getParoquiaById } from "@/lib/actions/nichos";
import Link from "next/link";
import { ChevronLeft, Filter, MapPin } from "lucide-react";
import FormGeradorNichos from "@/components/paroquias/FormGeradorNichos";
import NichoTile from "@/components/paroquias/NichoTile";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ParoquiaNichosPage({ params }: Props) {
  const { id } = await params;
  const paroquia = await getParoquiaById(id);
  const nichos = await getNichosByParoquia(id);

  if (!paroquia) {
    return <div className="p-10 text-center font-serif text-2xl">Paróquia não encontrada.</div>;
  }

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <Link href="/admin/paroquias" className="flex items-center gap-1 text-ink-500 text-xs font-bold uppercase tracking-widest hover:text-sage-600 transition">
                <ChevronLeft className="w-4 h-4" /> Voltar para Paróquias
            </Link>
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">{paroquia.nome} - Gestão de Nichos</h2>
            <div className="flex items-center gap-3 text-ink-500 text-xs font-semibold">
                <MapPin className="w-3 h-3" /> {paroquia.endereco || "Sem endereço"}
            </div>
        </div>
        <FormGeradorNichos paroquiaId={id} />
      </div>

      {/* Control Bar */}
      <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-cream-900/30">
        <div className="bg-cream-100 px-6 py-2 rounded-xl border border-cream-900/10 flex items-center gap-2">
            <span className="text-[10px] font-bold text-ink-500 uppercase tracking-widest leading-none">Capacidade</span>
            <span className="font-serif text-xl leading-none">{nichos.length} Unidades</span>
        </div>
        
        <div className="flex-1 flex justify-end gap-3">
             <button className="flex items-center gap-2 px-6 py-2 bg-white border border-cream-900/30 rounded-xl text-ink-500 text-[10px] uppercase font-bold tracking-widest hover:bg-cream-50 transition shadow-sm">
                <Filter className="w-4 h-4 text-sage-600" /> Filtrar Por Andar
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-white border border-cream-900/30 rounded-xl text-ink-500 text-[10px] uppercase font-bold tracking-widest hover:bg-cream-50 transition shadow-sm">
                Status: Todos
            </button>
        </div>
      </div>

      {/* Niche Grid */}
      {nichos.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-dashed border-cream-900/50 p-20 flex flex-col items-center gap-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-cream-50 rounded-full flex items-center justify-center text-5xl">🧊</div>
            <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-ink-900">Esta paróquia ainda não possui nichos físicos</h3>
                <p className="text-sm text-ink-500 max-w-sm">Utilize o gerador automático no topo da página para criar as unidades de acordo com os andares.</p>
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {nichos.map(nicho => (
                <NichoTile key={nicho.id} nicho={nicho} />
            ))}
        </div>
      )}

    </div>
  );
}
