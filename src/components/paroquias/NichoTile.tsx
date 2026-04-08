"use client";

import { useState } from "react";
import { MoreHorizontal, UserPlus, FileText, X, Loader2, QrCode } from "lucide-react";
import { createConcessao } from "@/lib/actions/concessoes";
import { createFamilia, searchFamilias } from "@/lib/actions/familias";
import NichoQrModal from "./NichoQrModal";

interface Props {
  nicho: any;
}

export default function NichoTile({ nicho }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [search, setSearch] = useState("");
  const [families, setFamilies] = useState<any[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<any>(null);
  const [showNewFamilyForm, setShowNewFamilyForm] = useState(false);

  const handleSearch = async (val: string) => {
    setSearch(val);
    if (val.length > 2) {
      const results = await searchFamilias(val);
      setFamilies(results);
    } else {
      setFamilies([]);
    }
  };

  const handleCreateConcessao = async () => {
    if (!selectedFamily) return;
    setIsPending(true);
    const formData = new FormData();
    formData.append("nichoId", nicho.id);
    formData.append("usuarioId", selectedFamily.id);
    
    try {
      await createConcessao(formData);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar concessão");
    } finally {
      setIsPending(false);
    }
  };

  const handleCreateFamilia = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      const result = await createFamilia(formData);
      if (result.success) {
        setSelectedFamily(result.familia);
        setShowNewFamilyForm(false);
      }
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar família");
    } finally {
        setIsPending(false);
    }
  };

  const isAvailable = nicho.status === "DISPONIVEL";
  // Construir a URL do memorial
  const memorialUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/memorial/${nicho.id}` 
    : `/memorial/${nicho.id}`;

  return (
    <>
      <div 
        className={`aspect-square bg-white border rounded-2xl flex flex-col items-center justify-center gap-1 p-2 relative group transition-all shadow-sm ${
            isAvailable 
            ? 'border-cream-900/50 hover:border-sage-500 hover:shadow-lg cursor-pointer' 
            : 'border-ink-900 bg-ink-50 opacity-80 cursor-default'
        }`}
      >
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <NichoQrModal url={memorialUrl} identificador={nicho.identificador} />
            <button 
                onClick={(e) => { e.stopPropagation(); isAvailable && setIsOpen(true); }}
                className="p-1.5 hover:bg-sage-50 rounded-lg text-ink-300 hover:text-sage-600 transition shadow-sm border border-cream-900/10"
            >
                <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
        </div>

        <div onClick={() => isAvailable && setIsOpen(true)} className="flex flex-col items-center justify-center w-full h-full">
            <div className={`w-2.5 h-2.5 rounded-full absolute top-3 left-3 ${nicho.status === 'DISPONIVEL' ? 'bg-sage-600' : nicho.status === 'RESERVADO' ? 'bg-peach-500' : 'bg-ink-900'}`}></div>

            <span className="text-[9px] uppercase font-bold text-ink-500 tracking-widest opacity-60">Andar {nicho.andar}</span>
            <h4 className="font-serif text-lg text-ink-900 leading-none">{nicho.identificador}</h4>
            <span className="text-[10px] font-bold text-sage-900 mt-1">
                {nicho.preco ? `R$ ${nicho.preco.toLocaleString('pt-BR')}` : '--'}
            </span>
        </div>
      </div>


      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 font-sans">
          <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-cream-900/50 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-cream-900/30 flex items-center justify-between bg-cream-50/50">
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl text-ink-900">Vincular Família</h3>
                <p className="text-xs text-ink-500 font-medium uppercase tracking-wider">Unidade: {nicho.identificador} | {nicho.paroquia.nome}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-peach-100 text-ink-500 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 flex flex-col gap-8">
              
              {!selectedFamily && !showNewFamilyForm && (
                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Buscar Família Registrada</label>
                  <div className="relative">
                    <input 
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Nome, E-mail ou CPF..."
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 transition"
                    />
                  </div>
                  
                  {families.length > 0 && (
                    <div className="flex flex-col gap-2 p-2 bg-cream-50 rounded-xl border border-cream-900/20">
                      {families.map(f => (
                        <button 
                          key={f.id}
                          onClick={() => setSelectedFamily(f)}
                          className="flex items-center justify-between p-3 hover:bg-white rounded-lg transition-colors text-left"
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-ink-900">{f.nome}</span>
                                <span className="text-[10px] text-ink-500 uppercase font-medium">{f.email} | {f.cpf}</span>
                            </div>
                            <UserPlus className="w-4 h-4 text-sage-600" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-cream-900/30"></div>
                    <span className="shrink-0 px-4 text-ink-500 text-[10px] font-bold uppercase">ou</span>
                    <div className="flex-grow border-t border-cream-900/30"></div>
                  </div>

                  <button 
                    onClick={() => setShowNewFamilyForm(true)}
                    className="w-full py-3 border border-dashed border-sage-500 rounded-xl text-sage-600 text-xs uppercase font-bold tracking-widest hover:bg-sage-50 transition"
                  >
                    + Novo Responsável Familiar
                  </button>
                </div>
              )}

              {showNewFamilyForm && (
                <form onSubmit={handleCreateFamilia} className="flex flex-col gap-4">
                   <h4 className="font-serif text-lg text-ink-900 mb-2">Dados do Responsável</h4>
                   <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Nome Completo</label>
                    <input name="nome" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Email</label>
                        <input name="email" type="email" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">CPF</label>
                        <input name="cpf" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none" />
                    </div>
                   </div>
                   <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Telefone</label>
                    <input name="telefone" required className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none" />
                   </div>
                   <div className="flex gap-4 mt-2">
                    <button type="button" onClick={() => setShowNewFamilyForm(false)} className="flex-1 py-3 text-xs uppercase font-bold text-ink-500">Voltar</button>
                    <button type="submit" disabled={isPending} className="flex-1 bg-sage-600 text-white rounded-xl py-3 text-xs uppercase font-bold transition hover:bg-sage-900">Salvar Familia</button>
                   </div>
                </form>
              )}

              {selectedFamily && (
                <div className="flex flex-col gap-6 bg-cream-50 p-6 rounded-2xl border border-sage-500/20">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-sage-600 uppercase tracking-widest">Família Selecionada</span>
                        <span className="font-serif text-xl text-ink-900">{selectedFamily.nome}</span>
                        <span className="text-xs text-ink-500">{selectedFamily.email} | {selectedFamily.cpf}</span>
                    </div>
                    <button onClick={() => setSelectedFamily(null)} className="text-[10px] font-bold text-red-500 uppercase">Trocar</button>
                  </div>

                  <div className="pt-6 border-t border-cream-900/30 flex flex-col gap-3">
                    <p className="text-[10px] text-ink-500 italic">Ao confirmar, o nicho será vinculado permanentemente a esta família e o status da unidade passará para "Ocupado".</p>
                    <button 
                       onClick={handleCreateConcessao}
                       disabled={isPending}
                       className="w-full bg-sage-900 text-white py-4 rounded-xl text-xs uppercase font-bold tracking-widest shadow-xl flex items-center justify-center gap-3 transition hover:bg-ink-900"
                    >
                      <FileText className="w-4 h-4" />
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Concessão"}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
