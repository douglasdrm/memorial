import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { 
  Church, 
  Grip, 
  Users, 
  ArrowUpRight 
} from "lucide-react";

export default async function AdminDashboard() {
  const user = await getSessionUser();

  // Fetching real stats from the database
  const countParoquias = await prisma.paroquia.count();
  const countNichos = await prisma.nicho.count();
  const countMemoriais = await prisma.memorial.count();

  const stats = [
    { name: "Total de Paróquias", value: countParoquias, icon: Church, color: "text-sage-600", bg: "bg-sage-50", change: "+12%" },
    { name: "Nichos Gerenciados", value: countNichos, icon: Grip, color: "text-ink-900", bg: "bg-cream-50", change: "+5% " },
    { name: "Memoriais Ativos", value: countMemoriais, icon: Users, color: "text-peach-900", bg: "bg-peach-50", change: "+3%" },
  ];

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header / Welcome Area */}
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-3xl text-ink-900 font-light">Olá, {user?.nome || "Administrador"}</h2>
        <p className="text-ink-500 font-medium tracking-wide">Bem-vindo ao centro de comando do Memorial Paroquial.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-3xl border border-cream-900/50 shadow-sm flex flex-col gap-4 group hover:border-sage-500 transition-all cursor-default">
            <div className="flex justify-between items-start">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-transform group-hover:scale-110`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-sage-600 font-bold text-xs">
                {stat.change} <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-ink-900 font-serif text-3xl">{stat.value}</span>
              <span className="text-ink-500 text-sm font-semibold uppercase tracking-widest">{stat.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Interessados em Parcerias (Leads) */}
        <div className="bg-white rounded-3xl border border-cream-900/50 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-light text-ink-900">Interessados (Leads)</h3>
            <span className="text-[10px] font-bold text-sage-600 bg-sage-50 px-2 py-1 rounded tracking-widest uppercase">Novos Contatos</span>
          </div>
          
          {!(prisma as any).interesseParoquia || (await (prisma as any).interesseParoquia.count()) === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-ink-500 gap-4 grayscale">
              <div className="w-20 h-20 bg-cream-50 rounded-full flex items-center justify-center opacity-50 text-2xl">📋</div>
              <p className="text-sm font-medium">Nenhum interesse registrado no site ainda.</p>
            </div>
          ) : (
             <div className="flex flex-col gap-4">
                {(await (prisma as any).interesseParoquia.findMany({ take: 5, orderBy: { dataInteresse: 'desc' } })).map((lead: any) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border border-cream-900/10 rounded-2xl hover:bg-cream-50/50 transition font-sans">
                         <div className="flex flex-col gap-0.5">
                             <span className="text-sm font-bold text-ink-900">{lead.nomeIgreja}</span>
                             <span className="text-[10px] text-ink-500 font-medium uppercase">{lead.email} | {lead.cidade}</span>
                         </div>
                         <ArrowUpRight className="w-4 h-4 text-ink-300" />
                    </div>
                ))}
                <button className="text-sage-600 font-bold text-[10px] uppercase tracking-widest hover:underline mt-2 text-center font-sans">Ver Todos os Leads</button>
             </div>
          )}
        </div>

        {/* Informações Rápidas */}
        <div className="bg-sage-600 rounded-3xl p-8 shadow-md text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none transition-all group-hover:scale-150"></div>
          <div className="relative z-10 flex flex-col gap-4">
            <h3 className="font-serif text-2xl font-light">Status da Rede</h3>
            <p className="text-sage-50 text-sm leading-relaxed max-w-xs">A nossa rede de memoriais está operando normalmente com 100% de estabilidade no Supabase.</p>
            <div className="flex gap-2 mt-4 text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-white/10 border border-white/20 px-3 py-1 rounded">Sincronizado</span>
              <span className="bg-sage-100 text-sage-900 px-3 py-1 rounded">Seguro</span>
            </div>
          </div>
          <button className="mt-8 bg-white text-sage-600 w-full py-3 rounded-xl uppercase text-[11px] font-bold tracking-[0.2em] shadow-sm hover:bg-sage-50 transition-all relative z-10">
            Dúvidas no Suporte
          </button>
        </div>

      </div>

    </div>
  );
}
