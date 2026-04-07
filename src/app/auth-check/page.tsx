import { auth } from "@/auth";

export default async function AuthCheckPage() {
  const session = await auth();

  return (
    <div className="p-10 font-sans flex flex-col gap-6 bg-cream-50 min-h-screen">
      <h1 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Página de Diagnóstico de Acesso 🕊️</h1>
      
      <div className="bg-white p-8 rounded-3xl border border-cream-900/50 shadow-sm flex flex-col gap-4">
        <h2 className="text-sm font-bold text-ink-500 uppercase tracking-widest border-b pb-2">Status da Sessão</h2>
        <pre className="p-4 bg-ink-900 text-sage-300 rounded-xl overflow-auto text-xs leading-relaxed">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-cream-900/50 shadow-sm flex flex-col gap-4">
        <h2 className="text-sm font-bold text-ink-500 uppercase tracking-widest border-b pb-2">Dica do Sistema</h2>
        <p className="text-ink-900 text-sm">
          {session?.user 
            ? `Você está logado como: ${session.user.name}. O sistema identifica seu cargo como: ${ (session.user as any).role || (session.user as any).tipo || "NENHUM" }.`
            : "Você NÃO está logado no sistema."
          }
        </p>
        <p className="text-ink-500 text-xs italic">
          * Nota: Se o cargo acima for diferente de "ADMIN_GERAL", você não conseguirá entrar no painel /admin.
        </p>
      </div>

      <div className="flex gap-4">
        <a href="/login" className="px-6 py-3 bg-sage-600 text-white rounded-xl text-xs uppercase font-bold tracking-widest">Ir para Login</a>
        <a href="/" className="px-6 py-3 bg-white border border-cream-900/50 text-ink-500 rounded-xl text-xs uppercase font-bold tracking-widest">Voltar para Home</a>
      </div>
    </div>
  );
}
