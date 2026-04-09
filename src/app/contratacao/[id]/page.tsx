import { getNichosByParoquia, getParoquiaById } from "@/lib/actions/nichos";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import NicheSelectionLayout from "./NicheSelectionLayout";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NicheMapSelectionPage({ params }: Props) {
  const { id } = await params;
  const paroquia = await getParoquiaById(id);
  const nichos = await getNichosByParoquia(id);

  if (!paroquia) {
    return <div className="p-20 text-center font-serif text-2xl">Paróquia não encontrada.</div>;
  }

  // Agrupar nichos por andar para o mapa
  const nichosPorAndar = nichos.reduce((acc: any, nicho) => {
    const andar = nicho.andar || 1;
    if (!acc[andar]) acc[andar] = [];
    acc[andar].push(nicho);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-cream-500 font-sans pb-20">
      
      {/* Dynamic Header */}
      <div className="bg-sage-900 pt-16 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
                <Link href="/contratacao" className="text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] transition">
                    <ArrowLeft className="w-4 h-4" /> Trocar Paróquia
                </Link>
                <div className="flex flex-col gap-1">
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide italic">{paroquia.nome}</h1>
                    <div className="flex items-center gap-2 text-white/50 text-xs font-semibold">
                        <MapPin className="w-4 h-4 text-peach-500" />
                        {paroquia.endereco || "Memorial Local"}
                    </div>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-white/80">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-serif">{nichos.filter(n => n.status === 'DISPONIVEL' || n.status === 'ATIVO').length}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60">Disponíveis</span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-serif">{nichos.length}</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60">Total de Unidades</span>
                </div>
            </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto -mt-16 px-6 relative z-10 w-full font-sans">
         <NicheSelectionLayout nichosPorAndar={nichosPorAndar} paroquiaId={paroquia.id} />
      </main>

    </div>
  );
}
