import { getMyParoquia, getMyNichos } from "@/lib/actions/paroquias_scoped";
import Link from "next/link";
import { ChevronLeft, Filter, MapPin, Grid3X3 } from "lucide-react";
import FormGeradorNichos from "@/components/paroquias/FormGeradorNichos";
import NichoTile from "@/components/paroquias/NichoTile";

export default async function IgrejaNichosPage() {
  const paroquia = await getMyParoquia();
  
  if (!paroquia) {
    return (
        <div className="flex flex-col items-center justify-center p-20 text-center gap-4">
            <div className="w-20 h-20 bg-peach-50 text-peach-600 rounded-full flex items-center justify-center text-3xl">⚠️</div>
            <h2 className="font-serif text-2xl">Paróquia não vinculada</h2>
            <p className="text-ink-500">Contate o administrador do sistema para vincular seu perfil a uma paróquia.</p>
        </div>
    );
  }

  const nichos = await getMyNichos();

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Breadcrumb & Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <Link href="/igreja" className="flex items-center gap-1 text-ink-500 text-xs font-bold uppercase tracking-widest hover:text-sage-600 transition">
                <ChevronLeft className="w-4 h-4" /> Voltar para o Início
            </Link>
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Gestão de Nichos</h2>
            <div className="flex items-center gap-3 text-ink-500 text-xs font-semibold">
                <MapPin className="w-3 h-3 text-sage-600" /> {paroquia.nome}
            </div>
        </div>
        <FormGeradorNichos paroquiaId={paroquia.id} />
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-cream-900/30">
        <div className="bg-cream-100 px-6 py-2 rounded-xl border border-cream-900/10 flex items-center gap-4">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink-500 uppercase tracking-widest leading-none">Total de Unidades</span>
                <span className="font-serif text-xl mt-1">{nichos.length} Nichos</span>
            </div>
            <div className="w-px h-8 bg-cream-900/20 mx-2"></div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-sage-600 uppercase tracking-widest leading-none">Disponíveis</span>
                <span className="font-serif text-xl text-sage-600 mt-1">{nichos.filter(n => n.status === 'DISPONIVEL').length}</span>
            </div>
        </div>
        
        <div className="flex-1 flex justify-end gap-3">
             <button className="flex items-center gap-2 px-6 py-2 bg-white border border-cream-900/30 rounded-xl text-ink-500 text-[10px] uppercase font-bold tracking-widest hover:bg-cream-50 transition shadow-sm">
                <Filter className="w-4 h-4 text-sage-600" /> Filtrar Pavimento
            </button>
        </div>
      </div>

      {/* Map View / Grid */}
      {nichos.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-dashed border-cream-900/50 p-20 flex flex-col items-center gap-6 text-center shadow-sm">
            <Grid3X3 className="w-16 h-16 text-cream-900 opacity-30" />
            <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-ink-900">Nenhum nicho configurado</h3>
                <p className="text-sm text-ink-500 max-w-sm mx-auto">Use o "Gerador em Massa" para criar rapidamente as unidades físicas da sua paróquia.</p>
            </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[2.5rem] border border-cream-900/30 shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                {nichos.map(nicho => (
                    <NichoTile key={nicho.id} nicho={nicho} />
                ))}
            </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 py-4 text-[10px] uppercase font-bold tracking-widest text-ink-400">
          <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-sage-600 rounded-full"></span> Disponível
          </div>
          <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-peach-500 rounded-full"></span> Reservado
          </div>
          <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-ink-900 rounded-full"></span> Ocupado
          </div>
      </div>

    </div>
  );
}
