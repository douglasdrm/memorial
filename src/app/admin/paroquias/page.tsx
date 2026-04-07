import { getParoquias } from "@/lib/actions/paroquias";
import FormNovaParoquia from "./FormNovaParoquia";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  ChevronRight, 
  Search, 
  Filter 
} from "lucide-react";

export default async function ParoquiasAdminPage() {
  const paroquias = await getParoquias();

  return (
    <div className="flex flex-col gap-10 h-full">
      
      {/* Header & Search */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Gestão de Paróquias</h2>
          <p className="text-ink-500 font-medium text-sm">Administre as igrejas e seus respectivos memoriais.</p>
        </div>
        <FormNovaParoquia />
      </div>

      {/* Control Bar */}
      <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-3 rounded-2xl border border-cream-900/30">
        <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-ink-500" />
            <input 
                placeholder="Pesquisar por nome ou CNPJ..." 
                className="w-full pl-12 pr-4 py-2 bg-white border border-cream-900/30 rounded-xl outline-none focus:border-sage-300 text-sm transition-all"
            />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-cream-900/30 rounded-xl text-ink-500 text-sm font-semibold hover:bg-cream-50 transition">
            <Filter className="w-4 h-4" />
            Filtrar
        </button>
      </div>

      {/* List / Table */}
      <div className="bg-white rounded-3xl border border-cream-900/50 shadow-sm overflow-hidden flex flex-col">
        {paroquias.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-ink-500 gap-6">
            <div className="w-24 h-24 bg-cream-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-cream-900/10">⛪</div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="font-serif text-2xl text-ink-900">Nenhuma paróquia cadastrada</h4>
                <p className="text-sm font-medium opacity-70">Comece adicionando a primeira unidade ao sistema.</p>
            </div>
            <FormNovaParoquia />
          </div>
        ) : (
          <div className="divide-y divide-cream-900/30">
            {paroquias.map((paroquia) => (
              <div 
                key={paroquia.id} 
                className="p-6 hover:bg-cream-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600 border border-sage-100 shadow-sm group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-serif text-xl text-ink-900">{paroquia.nome}</p>
                    <div className="flex items-center gap-4 text-ink-500 text-[10px] uppercase font-bold tracking-widest">
                       <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {paroquia.endereco || "Sem endereço cadastrado"}</span>
                       <span className="bg-cream-100 px-2 py-0.5 rounded text-gray-500">{paroquia.cnpj || "CNPJ não informado"}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest leading-none">Status</span>
                        <span className="text-sage-600 text-xs font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sage-600"></span> Ativa
                        </span>
                    </div>
                    <Link 
                        href={`/admin/paroquias/${paroquia.id}/nichos`}
                        className="px-4 py-2 bg-cream-50 border border-cream-900/30 rounded-xl text-ink-500 text-[10px] uppercase font-bold tracking-widest hover:bg-sage-600 hover:text-white hover:border-sage-600 transition-all shadow-sm"
                    >
                        Gerenciar Nichos
                    </Link>
                    <button className="p-3 bg-cream-50 border border-cream-900/30 rounded-xl text-ink-500 hover:bg-sage-600 hover:text-white hover:border-sage-600 transition-all shadow-sm">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
