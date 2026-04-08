"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { createParoquia } from "@/lib/actions/paroquias";

export default function FormNovaParoquia({ admins }: { admins: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    // Adiciona os IDs dos admins selecionados
    selectedAdmins.forEach(id => formData.append("adminIds", id));

    try {
      await createParoquia(formData);
      setIsOpen(false);
      setSelectedAdmins([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar paróquia");
    } finally {
      setIsPending(false);
    }
  };

  const toggleAdmin = (id: string) => {
    setSelectedAdmins(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-sage-600 hover:bg-sage-900 text-white px-6 py-2.5 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center gap-2 shadow-md transition-all active:scale-95"
      >
        <Plus className="w-4 h-4" />
        Nova Paróquia
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-cream-900/50 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-cream-900/30 flex items-center justify-between bg-cream-50/50 shrink-0">
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl text-ink-900">Cadastrar Paróquia</h3>
                <p className="text-xs text-ink-500 font-medium uppercase tracking-wider">Configuração de Nova SPE</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-peach-100 text-ink-500 hover:text-red-500 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6 overflow-y-auto">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Nome da Paróquia</label>
                <input 
                  name="nome"
                  required
                  placeholder="Ex: Matriz São Geraldo"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Administradores Responsáveis</label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto p-1">
                    {admins.map(admin => (
                        <label 
                            key={admin.id} 
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                selectedAdmins.includes(admin.id) 
                                ? 'bg-sage-50 border-sage-500 shadow-sm' 
                                : 'bg-white border-cream-900/30 hover:border-sage-300'
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-ink-900">{admin.nome}</span>
                                <span className="text-[10px] text-ink-400 uppercase font-medium">{admin.email}</span>
                            </div>
                            <input 
                                type="checkbox"
                                className="hidden"
                                checked={selectedAdmins.includes(admin.id)}
                                onChange={() => toggleAdmin(admin.id)}
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                selectedAdmins.includes(admin.id) ? 'bg-sage-600 border-sage-600' : 'border-cream-900/30'
                            }`}>
                                {selectedAdmins.includes(admin.id) && <Plus className="w-3 h-3 text-white rotate-45" />}
                            </div>
                        </label>
                    ))}
                </div>
                <p className="text-[10px] text-ink-400 italic">Você pode selecionar múltiplos administradores para esta unidade.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">CNPJ (Opcional)</label>
                <input 
                    name="cnpj"
                    placeholder="00.000.000/0001-00"
                    className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-ink-900 uppercase tracking-widest">Endereço Completo</label>
                <textarea 
                  name="endereco"
                  rows={2}
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                  className="w-full px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 border border-cream-900/50 rounded-xl text-xs uppercase font-bold tracking-widest text-ink-500 hover:bg-cream-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 bg-sage-600 hover:bg-sage-900 text-white px-6 py-3 rounded-xl text-xs uppercase font-bold tracking-widest shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Salvar Paróquia"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
