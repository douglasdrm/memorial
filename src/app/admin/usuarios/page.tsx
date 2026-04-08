import { prisma } from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth/session";
import { aprovarUsuario, suspenderUsuario, excluirUsuario } from "@/lib/actions/usuarios";
import { Check, X, Ban, User, Mail, Calendar } from "lucide-react";

export default async function UsuariosAdminPage() {
  const admin = await requireSuperAdmin();

  const usuarios = await prisma.usuario.findMany({
    orderBy: { dataCriacao: "desc" },
  });

  const pendentes = usuarios.filter((u) => u.status === "PENDENTE");
  const ativos = usuarios.filter((u) => u.status === "ATIVO");

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-3xl text-ink-900 uppercase tracking-widest mb-2">Gestão de Usuários</h1>
          <p className="text-ink-500 text-sm">Controle de acessos e aprovação de novos gerentes.</p>
        </div>
      </div>

      {pendentes.length > 0 && (
        <section className="mb-12">
          <h2 className="text-peach-800 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-peach-500 rounded-full animate-pulse" />
            Solicitações Pendentes ({pendentes.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendentes.map((u) => (
              <div key={u.id} className="bg-white border border-peach-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-peach-50 rounded-full flex items-center justify-center">
                    <User className="text-peach-600" size={20} />
                  </div>
                  <div className="flex gap-2">
                    <form action={aprovarUsuario.bind(null, u.id)}>
                      <button className="p-2 bg-sage-50 text-sage-600 rounded-lg hover:bg-sage-600 hover:text-white transition-colors" title="Aprovar">
                        <Check size={18} />
                      </button>
                    </form>
                    <form action={excluirUsuario.bind(null, u.id)}>
                      <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors" title="Rejeitar">
                        <X size={18} />
                      </button>
                    </form>
                  </div>
                </div>
                <h3 className="font-bold text-ink-900 mb-1">{u.nome}</h3>
                <div className="flex items-center gap-2 text-xs text-ink-400 mb-3">
                  <Mail size={12} /> {u.email}
                </div>
                <div className="pt-4 border-t border-cream-900/10 flex justify-between items-center text-[10px] text-ink-400 uppercase font-bold tracking-tighter">
                  <span>Papel: {u.tipo}</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {u.dataCriacao.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-ink-900 text-xs font-bold uppercase tracking-widest mb-6 px-1">Usuários Ativos</h2>
        <div className="bg-white border border-cream-900/30 rounded-3xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-cream-50 text-ink-500 text-[10px] uppercase font-bold tracking-widest outline-none border-b border-cream-900/30">
              <tr>
                <th className="px-6 py-4">Usuário</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-900/20">
              {ativos.map((u) => (
                <tr key={u.id} className="hover:bg-cream-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {u.nome.charAt(0)}
                      </div>
                      <div>
                        <div className="text-ink-900 font-bold text-sm">{u.nome}</div>
                        <div className="text-ink-400 text-xs">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-ink-500 bg-cream-100 px-2 py-1 rounded uppercase">
                      {u.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="flex items-center gap-1.5 text-xs text-sage-600 font-medium">
                      <span className="w-1.5 h-1.5 bg-sage-500 rounded-full" />
                      Ativo
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {u.tipo !== "ADMIN_GERAL" && (
                      <form action={suspenderUsuario.bind(null, u.id)} className="inline">
                        <button className="text-ink-400 hover:text-red-600 transition-colors p-2" title="Suspender">
                          <Ban size={18} />
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
