import { getMyNichos, getMyParoquia } from "@/lib/actions/paroquias_scoped";
import { Filter, Grid3X3, MapPin, Search } from "lucide-react";
import FormGeradorNichos from "../../admin/paroquias/FormGeradorNichos";
import NichoTile from "../../admin/paroquias/NichoTile";

export default async function MinhaParoquiaNichosPage() {
  const paroquia = await getMyParoquia();
  const nichos = await getMyNichos();

  if (!paroquia) {
    return <div className="p-10 text-center font-serif text-2xl">Paróquia não vinculada.</div>;
  }

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Meus Nichos e Unidades</h2>
            <div className="flex items-center gap-3 text-ink-500 text-xs font-semibold uppercase tracking-[0.1em]">
                <MapPin className="w-3 h-3 text-sage-600" /> {paroquia.nome}
            </div>
        </div>
        <FormGeradorNichos paroquiaId={paroquia.id} />
      </div>

      {/* Control Bar */}
      <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-cream-900/30">
        <div className="bg-cream-100 px-6 py-2 rounded-xl border border-cream-900/10 flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-ink-400" />
            <span className="text-[10px] font-bold text-ink-500 uppercase tracking-widest leading-none">Total: {nichos.length}</span>
        </div>
        
        <div className="flex-1 flex justify-end gap-3">
             <button className="flex items-center gap-2 px-6 py-2 bg-white border border-cream-900/30 rounded-xl text-ink-500 text-[10px] uppercase font-bold tracking-widest hover:bg-cream-50 transition shadow-sm">
                <Filter className="w-4 h-4 text-sage-600" /> Filtrar Por Andar
            </button>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-300" />
                <input className="pl-10 pr-4 py-2 bg-white border border-cream-900/30 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:border-sage-500 transition shadow-sm" placeholder="Buscar Nicho..." />
            </div>
        </div>
      </div>

      {/* Niche Grid */}
      {nichos.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] border border-dashed border-cream-900/50 p-20 flex flex-col items-center gap-6 text-center shadow-sm">
            <div className="w-24 h-24 bg-cream-50 rounded-full flex items-center justify-center text-5xl">🧊</div>
            <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-ink-900">Sua paróquia ainda não possui nichos cadastrados</h3>
                <p className="text-sm text-ink-500 max-w-sm">Use o gerador em massa acima para criar as primeiras unidades de sua igreja.</p>
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
