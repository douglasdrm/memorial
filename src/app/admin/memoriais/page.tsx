import { prisma } from "@/lib/prisma";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  ExternalLink,
  Plus
} from "lucide-react";
import Link from "next/link";

export default async function MemoriaisPage() {
  const memoriais = await prisma.memorial.findMany({
    include: {
      concessao: {
        include: {
          nicho: { include: { paroquia: true } },
          familia: true
        }
      }
    },
    orderBy: { nomeFalecido: "asc" }
  });

  return (
    <div className="flex flex-col gap-10 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Gestão de Memoriais</h2>
            <p className="text-ink-500 text-sm font-medium">Homenagens digitais e históricos de vida</p>
        </div>
        <Link 
            href="/admin/concessoes" 
            className="bg-sage-600 hover:bg-sage-900 text-white px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center gap-2 shadow-md transition-all"
        >
            <Plus className="w-4 h-4" /> Novo Memorial (Via Concessão)
        </Link>
      </div>

      {/* Memoriais List */}
      <div className="bg-white rounded-[2.5rem] border border-cream-900/30 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-cream-50/50 border-b border-cream-900/20">
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Falecido(a)</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Nicho / Unidade</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Responsável</th>
                    <th className="px-8 py-5 text-[10px] uppercase font-bold text-ink-500 tracking-widest">Status</th>
                    <th className="px-8 py-5"></th>
                </tr>
            </thead>
            <tbody>
                {memoriais.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-ink-500 italic">
                            Nenhum memorial criado ainda. Os memoriais são criados a partir das Concessões.
                        </td>
                    </tr>
                ) : (
                    memoriais.map((m) => (
                        <tr key={m.id} className="border-b border-cream-900/10 hover:bg-cream-50/30 transition-colors">
                            <td className="px-8 py-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-ink-900">{m.nomeFalecido}</span>
                                    <span className="text-[10px] text-ink-500 uppercase font-medium tracking-widest">
                                        {m.dataFalecimento ? new Date(m.dataFalecimento).getFullYear() : 'S/D'}
                                    </span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-serif">{m.concessao.nicho.identificador}</span>
                            </td>
                            <td className="px-8 py-6 text-sm text-ink-900 font-medium">
                                {m.concessao.familia.nome}
                            </td>
                            <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-bold tracking-widest ${m.status === 'PUBLICO' ? 'bg-sage-100 text-sage-600' : 'bg-peach-100 text-peach-600'}`}>
                                    {m.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Link 
                                        href={`/memorial/${m.concessaoId}`} 
                                        target="_blank"
                                        className="p-2 text-ink-400 hover:text-sage-600 transition"
                                        title="Ver Página Pública"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <button className="p-2 text-ink-400 hover:text-sage-600 transition" title="Editar">
                                        <Edit3 className="w-5 h-5" />
                                    </button>
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
