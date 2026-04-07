import { getMemorialByConcessao, upsertMemorial } from "@/lib/actions/memoriais";
import { 
  ChevronLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  Calendar, 
  Heart,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarMemorialPage({ params }: Props) {
  const { id } = await params;
  const memorial = await getMemorialByConcessao(id);

  async function action(formData: FormData) {
    "use server";
    await upsertMemorial(formData);
    redirect("/admin/concessoes");
  }

  return (
    <div className="flex flex-col gap-10 font-sans max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
            <Link href="/admin/concessoes" className="flex items-center gap-1 text-ink-500 text-xs font-bold uppercase tracking-widest hover:text-sage-600 transition">
                <ChevronLeft className="w-4 h-4" /> Voltar para Concessões
            </Link>
            <h2 className="font-serif text-3xl text-ink-900 font-light tracking-wide">
                {memorial ? `Editar Memorial: ${memorial.nomeFalecido}` : "Configurar Novo Memorial"}
            </h2>
            <p className="text-ink-500 text-sm font-medium">Preencha as informações que ficarão visíveis na página pública de homenagem.</p>
      </div>

      <form action={action} className="flex flex-col gap-8 bg-white p-10 rounded-[2.5rem] border border-cream-900/30 shadow-sm">
        
        <input type="hidden" name="concessaoId" value={id} />

        {/* Basic Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-cream-900/20">
            <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-ink-900 tracking-widest flex items-center gap-2">
                    <User className="w-3.5 h-3.5" /> Nome do Falecido(a)
                </label>
                <input 
                    name="nomeFalecido" 
                    defaultValue={memorial?.nomeFalecido}
                    required
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition"
                    placeholder="Ex: João da Silva Santos"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-ink-900 tracking-widest flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Data de Nascimento
                </label>
                <input 
                    name="dataNascimento" 
                    type="date"
                    defaultValue={memorial?.dataNascimento ? new Date(memorial.dataNascimento).toISOString().split('T')[0] : ''}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-ink-900 tracking-widest flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Data de Falecimento
                </label>
                <input 
                    name="dataFalecimento" 
                    type="date"
                    defaultValue={memorial?.dataFalecimento ? new Date(memorial.dataFalecimento).toISOString().split('T')[0] : ''}
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition"
                />
            </div>
        </div>

        {/* Biography */}
        <div className="flex flex-col gap-4">
            <label className="text-[10px] uppercase font-bold text-ink-900 tracking-widest flex items-center gap-2">
                <Type className="w-3.5 h-3.5" /> Biografia e Homenagem
            </label>
            <textarea 
                name="biografia"
                rows={8}
                defaultValue={memorial?.biografia || ""}
                placeholder="Conte a história, os valores e o legado que esta pessoa deixou..."
                className="w-full px-6 py-4 bg-cream-50 border border-cream-900/50 rounded-2xl outline-none focus:border-sage-500 transition font-serif italic text-lg text-ink-800"
            />
        </div>

        {/* Photos Notification */}
        <div className="p-6 bg-sage-50 rounded-2xl border border-sage-500/20 flex gap-4 items-start">
            <ImageIcon className="w-6 h-6 text-sage-600 shrink-0" />
            <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-sage-900">Upload de Fotos</p>
                <p className="text-xs text-sage-600 leading-relaxed">
                    Você poderá carregar até **10 fotos** para o mural de lembranças. 
                    Por enquanto, use links externos ou salvaremos o suporte a upload real no próximo passo.
                </p>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6">
            <Link href="/admin/concessoes" className="px-6 py-3 text-xs uppercase font-bold text-ink-500 hover:text-ink-900 transition tracking-widest">
                Cancelar
            </Link>
            <button 
                type="submit"
                className="bg-sage-600 hover:bg-sage-900 text-white px-10 py-4 rounded-2xl text-xs uppercase font-bold tracking-widest shadow-xl flex items-center gap-3 transition-all"
            >
                <Save className="w-4 h-4" /> Salvar Memorial
            </button>
        </div>

      </form>

    </div>
  );
}

// Add User icon import since I used it inside label
import { User } from "lucide-react";
