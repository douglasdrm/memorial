import { getConcessoes } from "@/lib/actions/concessoes";
import { 
  FileCheck, 
  User, 
  Calendar, 
  ArrowUpRight,
  ExternalLink,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default async function ConcessoesPage() {
  const concessoes = await getConcessoes();

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Gestão de Concessões</h2>
            <p className="text-ink-500 text-sm font-medium">Controle de unidades vinculadas e contratos ativos</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[2rem] border border-cream-900/30 flex items-center gap-4 shadow-sm">
            <div className="p-4 bg-sage-50 rounded-2xl text-sage-600">
                <FileCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest">Contratos Ativos</span>
                <span className="font-serif text-2xl text-ink-900">{concessoes.length}</span>
            </div>
          </div>
      </div>

      {/* Concessions Table */}
      <div className="bg-white rounded-[2.5rem] border border-cream-900/30 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-cream-50/50 border-b border-cream-900/20">
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Responsável</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Nicho / Unidade</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Paróquia</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Início / Validade</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Status</th>
                    <th className="px-8 py-5"></th>
                </tr>
            </thead>
            <tbody>
                {concessoes.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-8 py-20 text-center text-ink-500 italic">
                            Nenhuma concessão registrada até o momento.
                        </td>
                    </tr>
                ) : (
                    concessoes.map((c) => (
                        <tr key={c.id} className="border-b border-cream-900/10 hover:bg-cream-50/30 transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center text-sage-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-ink-900">{c.familia?.nome || "Sem nome"}</span>
                                        <span className="text-[10px] text-ink-500 font-medium">{c.familia?.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-serif">{c.nicho.identificador}</span>
                                    {/* @ts-ignore */}
                                    <span className="text-[10px] text-ink-500 uppercase font-bold tracking-widest">Andar {c.nicho.andar}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-sm text-ink-900 font-medium">
                                {c.nicho.paroquia.nome}
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-ink-500 text-[10px] font-bold uppercase tracking-widest">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(c.dataInicio).toLocaleDateString('pt-BR')}
                                    {/* @ts-ignore */}
                                    {c.dataFim && ` - ${new Date(c.dataFim).toLocaleDateString('pt-BR')}`}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest ${c.status === 'ATIVO' ? 'bg-sage-100 text-sage-600' : 'bg-red-50 text-red-500'}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-3">
                                    <Link 
                                        href={`/memorial/${c.id}`}
                                        target="_blank"
                                        className="p-2 text-ink-400 hover:text-sage-600 transition"
                                        title="Ver Página Pública"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <Link 
                                        href={`/admin/concessoes/${c.id}/memorial`}
                                        className="p-2 text-ink-400 hover:text-sage-600 transition"
                                        title="Gerenciar Memorial"
                                    >
                                        <BookOpen className="w-5 h-5" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
      </div>

    </div>
  );
}
