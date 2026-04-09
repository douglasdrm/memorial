"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Image as ImageIcon, 
  Settings, 
  Save, 
  Loader2,
  Camera,
  Trash2,
  Globe,
  Lock
} from "lucide-react";
import { updateMemorial } from "@/lib/actions/memorial";
import GalleryEditor from "./GalleryEditor";

interface Props {
  memorial: any;
}

export default function MemorialEditorTabs({ memorial }: Props) {
  const [activeTab, setActiveTab] = useState<"bio" | "gallery" | "settings">("bio");
  const [isPending, setIsPending] = useState(false);

  const tabs = [
    { id: "bio", label: "História de Vida", icon: BookOpen },
    { id: "gallery", label: "Galeria de Fotos", icon: ImageIcon },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  async function handleSave(formData: FormData) {
      setIsPending(true);
      try {
          await updateMemorial(memorial.id, formData);
          alert("Alterações salvas com sucesso!");
      } catch (error) {
          console.error(error);
          alert("Erro ao salvar alterações.");
      } finally {
          setIsPending(false);
      }
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-2xl border border-cream-900/30 w-fit backdrop-blur-sm self-center md:self-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all
              ${activeTab === tab.id 
                ? 'bg-sage-900 text-white shadow-lg' 
                : 'text-ink-400 hover:text-ink-900 hover:bg-white'}
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-cream-900/50 p-10 min-h-[500px]">
        
        <form action={handleSave} className="flex flex-col gap-10">
          
          {/* Tab: Biography */}
          {activeTab === "bio" && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-3xl text-ink-900">História de Vida</h3>
                    <p className="text-xs text-ink-500 font-medium italic">Compartilhe as memórias, conquistas e o legado deixado.</p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Biografia / Tributo</label>
                    <textarea 
                        name="biografia"
                        defaultValue={memorial.biografia}
                        placeholder="Nacido em..., dedicou sua vida a... Foi uma pessoa que espalhou luz através de..."
                        className="w-full min-h-[350px] p-6 bg-cream-50 border border-cream-900/30 rounded-2xl outline-none focus:border-sage-500 focus:bg-white transition-all font-serif text-lg leading-relaxed text-ink-900"
                    />
                </div>
            </div>
          )}

          {/* Tab: Gallery */}
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-3xl text-ink-900">Galeria de Memórias</h3>
                    <p className="text-xs text-ink-500 font-medium italic">Selecione até 10 fotos que melhor representam os momentos felizes.</p>
                </div>

                <GalleryEditor memorialId={memorial.id} fotosIniciais={memorial.fotos} />
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === "settings" && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-2xl">
                <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-3xl text-ink-900">Privacidade e Link</h3>
                    <p className="text-xs text-ink-500 font-medium italic">Controle quem pode acessar a homenagem e o endereço único dela.</p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Endereço da Homenagem (URL)</label>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-ink-400 bg-cream-50 px-3 py-3 rounded-xl border border-cream-900/30 font-medium">memorial.com/homenageado/</span>
                            <input 
                                name="slug"
                                defaultValue={memorial.slug || ""}
                                placeholder="ex: joao-silva"
                                className="flex-1 px-4 py-3 bg-cream-50 border border-cream-900/30 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Visibilidade</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`
                                flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition
                                ${memorial.status === 'PRIVADO' ? 'bg-peach-50 border-peach-500/30' : 'bg-white border-cream-900/30'}
                            `}>
                                <input type="radio" name="status" value="PRIVADO" defaultChecked={memorial.status === 'PRIVADO'} className="hidden" />
                                <Lock className="w-5 h-5 text-peach-600" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Privado</span>
                                    <span className="text-[9px] text-ink-400">Apenas você pode ver</span>
                                </div>
                            </label>
                            <label className={`
                                flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition
                                ${memorial.status === 'PUBLICO' ? 'bg-sage-50 border-sage-500/30' : 'bg-white border-cream-900/30'}
                            `}>
                                <input type="radio" name="status" value="PUBLICO" defaultChecked={memorial.status === 'PUBLICO'} className="hidden" />
                                <Globe className="w-5 h-5 text-sage-600" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Público</span>
                                    <span className="text-[9px] text-ink-400">Acessível via QR Code</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* Common Footer: Floating Save Action */}
          <div className="pt-10 border-t border-cream-900/20 flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="text-[9px] text-ink-400 uppercase font-bold tracking-[0.2em]">Sincronização em tempo real</span>
                  <span className="text-[10px] text-ink-500 mt-0.5">Lembre-se de salvar antes de sair.</span>
              </div>
              <button 
                type="submit"
                disabled={isPending}
                className="bg-sage-600 text-white px-10 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] shadow-xl hover:bg-sage-900 transition flex items-center gap-3 disabled:opacity-50 active:scale-95"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Salvar Alterações
              </button>
          </div>

        </form>
      </div>
    </div>
  );
}
