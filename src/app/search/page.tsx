import { searchMemoriais } from "@/lib/actions/search";
import { Search, MapPin, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const query = (await searchParams).q || "";
  const results = await searchMemoriais(query);

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      {/* Header Fino */}
      <nav className="bg-white border-b border-cream-900/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-8 border border-ink-900 rounded-t-full flex items-center justify-center relative">
                <div className="w-1 h-1 rounded-full bg-ink-900 absolute top-2"></div>
            </div>
            <span className="font-serif text-lg tracking-widest text-ink-900">MEMORIAL</span>
        </Link>
        <div className="text-xs font-bold text-ink-400 uppercase tracking-widest">
            Busca: <span className="text-sage-600">"{query}"</span>
        </div>
        <Link href="/login" className="text-[10px] font-bold uppercase tracking-widest text-ink-900 hover:text-sage-600 transition">Entrar</Link>
      </nav>

      <main className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex flex-col gap-2 mb-12">
            <h1 className="font-serif text-4xl text-ink-900">Resultados da Busca</h1>
            <p className="text-ink-500 font-medium">Encontramos {results.length} resultados para sua pesquisa.</p>
        </div>

        {results.length === 0 ? (
            <div className="bg-white rounded-[3rem] p-20 border border-cream-900/30 text-center flex flex-col items-center gap-6 shadow-sm">
                <div className="w-20 h-20 bg-cream-50 rounded-full flex items-center justify-center text-3xl opacity-50">🔍</div>
                <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl text-ink-900">Nenhum resultado encontrado</h3>
                    <p className="text-ink-500 max-w-sm">Verifique a grafia do nome ou tente buscar apenas pela cidade ou paróquia.</p>
                </div>
                <Link href="/" className="mt-4 bg-sage-600 text-white px-10 py-4 rounded-2xl text-[10px] uppercase font-bold tracking-widest hover:bg-sage-900 transition shadow-lg">Voltar à Home</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((memorial) => (
                    <Link 
                        key={memorial.id}
                        href={`/memorial/${memorial.id}`}
                        className="bg-white rounded-[2.5rem] border border-cream-900/30 p-8 hover:shadow-2xl hover:border-sage-500 transition-all group flex flex-col gap-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-cream-50 rounded-3xl overflow-hidden relative border border-cream-900/10 shrink-0">
                                {memorial.fotos && memorial.fotos.length > 0 ? (
                                    <Image src={memorial.fotos[0].urlFoto} alt={memorial.nomeFalecido} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-ink-200">
                                        <User className="w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-sage-600 uppercase tracking-widest">Memorial Digital</span>
                                <h2 className="font-serif text-2xl text-ink-900 leading-tight">{memorial.nomeFalecido}</h2>
                                <div className="flex items-center gap-2 text-ink-400 text-[10px] font-bold uppercase ring-widest mt-1">
                                    <MapPin className="w-3 h-3" />
                                    {memorial.concessao.nicho.paroquia.nome}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-cream-900/10 flex items-center justify-between group-hover:pl-4 transition-all">
                             <p className="text-xs text-ink-500 line-clamp-1 italic max-w-[80%]">
                                {memorial.biografia || "Homenagem eterna em nossa fé."}
                             </p>
                             <div className="w-8 h-8 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 group-hover:bg-sage-600 group-hover:text-white transition-colors">
                                <ChevronRight className="w-4 h-4" />
                             </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </main>

      <footer className="py-20 flex flex-col items-center gap-6 opacity-40 grayscale pointer-events-none mt-20">
          <div className="w-12 h-20 border border-ink-900 rounded-t-full flex items-center justify-center relative">
              <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-4"></div>
          </div>
          <span className="font-serif text-[10px] uppercase tracking-[0.5em] text-ink-900">In Memoria</span>
      </footer>
    </div>
  );
}
