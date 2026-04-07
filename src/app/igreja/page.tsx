import { getMyParoquia, getMyNichos, getMyConcessoes } from "@/lib/actions/paroquias_scoped";
import { 
  Users, 
  Grid3X3, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default async function IgrejaDashboard() {
  const paroquia = await getMyParoquia();
  const nichos = await getMyNichos();
  const concessoes = await getMyConcessoes();

  const occupiedCount = nichos.filter(n => n.status === "OCUPADO").length;
  const availableCount = nichos.filter(n => n.status === "DISPONIVEL").length;

  if (!paroquia) {
    return <div className="p-10 font-serif text-2xl">Paróquia não vinculada ao seu usuário.</div>;
  }

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Welcome & Identity */}
      <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Bem-vindo, {paroquia.nome}</h2>
            <div className="flex items-center gap-3 text-ink-500 text-sm font-medium">
                <MapPin className="w-4 h-4 text-sage-600" /> {paroquia.endereco || "Gestão Local Ativa"}
            </div>
      </div>

      {/* Parish Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-cream-900/30 flex items-center gap-4 shadow-sm">
            <div className="p-4 bg-sage-50 rounded-2xl text-sage-600">
                <Grid3X3 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest">Total de Nichos</span>
                <span className="font-serif text-2xl text-ink-900">{nichos.length}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-[2rem] border border-cream-900/30 flex items-center gap-4 shadow-sm">
            <div className="p-4 bg-peach-50 rounded-2xl text-peach-600">
                <Users className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest">Famílias Ativas</span>
                <span className="font-serif text-2xl text-ink-900">{concessoes.length}</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-cream-900/30 flex items-center gap-4 shadow-sm">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
                <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest">Taxa de Ocupação</span>
                <span className="font-serif text-2xl text-ink-900">
                   {nichos.length > 0 ? Math.round((occupiedCount / nichos.length) * 100) : 0}%
                </span>
            </div>
          </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Latest Concessions List */}
          <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-ink-900">Últimas Concessões</h3>
                  <Link href="/igreja/clientes" className="text-[10px] items-center gap-1 font-bold text-sage-600 hover:text-sage-900 transition flex">
                      Ver Todos <ChevronRight className="w-3 h-3" />
                  </Link>
              </div>

              <div className="bg-white rounded-[2rem] border border-cream-900/30 shadow-sm overflow-hidden">
                {concessoes.length === 0 ? (
                    <div className="p-20 text-center text-ink-400 italic text-sm">Nenhuma concessão ativa ainda.</div>
                ) : (
                    concessoes.slice(0, 5).map((c) => (
                        <div key={c.id} className="flex items-center justify-between p-6 border-b border-cream-900/10 hover:bg-cream-50/50 transition">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center text-sage-600">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-ink-900">{c.familia.nome}</span>
                                    <span className="text-[10px] text-ink-500 font-medium lowercase italic">Nicho {c.nicho.identificador}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-ink-400 font-bold tracking-widest">{new Date(c.dataInicio).toLocaleDateString('pt-BR')}</span>
                                <Link href={`/igreja/clientes/${c.id}`} className="p-2 text-ink-300 hover:text-sage-600 transition">
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
              </div>
          </div>

          {/* Quick Actions / Search */}
          <div className="flex flex-col gap-6">
               <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-ink-900">Ações Rápidas</h3>
               <div className="flex flex-col gap-3">
                   <button className="flex items-center justify-between p-6 bg-white border border-cream-900/30 rounded-[2rem] hover:shadow-lg hover:border-sage-300 transition-all font-bold text-xs group">
                        <span>Novo Cliente / Contrato</span>
                        <Plus className="w-5 h-5 text-sage-600 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <button className="flex items-center justify-between p-6 bg-white border border-cream-900/30 rounded-[2rem] hover:shadow-lg hover:border-sage-300 transition-all font-bold text-xs group">
                        <span>Gerenciar Nichos</span>
                        <Grid3X3 className="w-5 h-5 text-sage-600 group-hover:translate-x-1 transition-transform" />
                   </button>
               </div>
          </div>
      </div>

    </div>
  );
}

import { Plus } from "lucide-react";
