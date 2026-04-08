import { getParoquias } from "@/lib/actions/paroquias";
import Link from "next/link";
import { Church, MapPin, ChevronRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default async function ContratacaoSelecaoPage() {
  const paroquias = await getParoquias();

  return (
    <div className="min-h-screen bg-cream-500 font-sans">
      {/* Decorative Header */}
      <div className="h-64 bg-sage-900 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
            {/* Um padrão sutil ou gradiente pode vir aqui */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <Link href="/" className="text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] transition">
                <ArrowLeft className="w-4 h-4" /> Voltar ao site principal
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">Escolha uma Unidade</h1>
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase">Selecione a paróquia para reservar o seu nicho</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto -mt-16 relative z-20 px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paroquias.map((paroquia) => (
                <Link 
                    key={paroquia.id}
                    href={`/contratacao/${paroquia.id}`}
                    className="bg-white rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all border border-cream-900/50 group flex flex-col gap-6"
                >
                    <div className="flex items-start justify-between">
                        <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600 transition-transform group-hover:scale-110">
                            <Church className="w-8 h-8" />
                        </div>
                        <span className="text-[10px] font-bold text-sage-600 bg-sage-50 px-3 py-1.5 rounded-full tracking-widest uppercase">Aberta para Reservas</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="font-serif text-3xl text-ink-900 group-hover:text-sage-600 transition-colors uppercase">{paroquia.nome}</h2>
                        <div className="flex items-center gap-2 text-ink-400 text-xs font-semibold">
                            <MapPin className="w-4 h-4 text-peach-500" />
                            {paroquia.endereco || "Localização central"}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-cream-900/10 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-ink-400 uppercase font-bold tracking-[0.1em]">Disponibilidade</span>
                            <span className="text-ink-900 font-serif text-lg">Nichos em Pronta Entrega</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-cream-50 flex items-center justify-center text-ink-900 group-hover:bg-sage-600 group-hover:text-white transition-all">
                            <ChevronRight className="w-6 h-6" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>

        {paroquias.length === 0 && (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-cream-900/50 shadow-sm flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-cream-50 rounded-full flex items-center justify-center text-4xl">⛪</div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-2xl text-ink-900 opacity-50">Nenhuma paróquia disponível para contratação online no momento</h3>
                    <p className="text-sm text-ink-500">Estamos expandindo para novas regiões em breve.</p>
                </div>
            </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-cream-900/30 py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
              <p className="text-[10px] text-ink-400 uppercase font-bold tracking-[0.3em]">Homenageie quem você ama. Com dignidade e fé.</p>
          </div>
      </footer>
    </div>
  );
}
