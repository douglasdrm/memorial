import { signIn } from "@/auth";

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Soft Decoration */}
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20"></div>
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-8">
           <div className="w-8 h-12 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative mb-4">
             <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-3"></div>
           </div>
           <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
             Memorial<br/>Paroquial
           </h1>
           <p className="text-ink-500 text-sm mt-3 font-medium">Acesso Restrito</p>
        </div>

        {searchParams.error && (
          <div className="bg-peach-100 text-red-800 text-sm p-3 rounded-lg text-center mb-6 border border-red-200">
            Credenciais inválidas. Tente novamente.
          </div>
        )}

        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", Object.fromEntries(formData));
            } catch (error: any) {
              if (error.type === "CredentialsSignin") {
                // NextAuth redireciona automaticamente com erro na URL
                throw error;
              }
              // Se for erro de redirecionamento do próprio Next.js (sucesso), deixa passar
              if (error.message?.includes("NEXT_REDIRECT")) {
                throw error;
              }
              console.error("Erro no login:", error);
              throw error;
            }
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">E-mail</label>
            <input 
              type="email" 
              name="email"
              required
              className="px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
              placeholder="seu@email.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Senha</label>
            <input 
              type="password" 
              name="password"
              required
              className="px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors"
          >
            Entrar no Painel
          </button>
        </form>

        <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-cream-900/50"></div>
            <span className="shrink-0 px-4 text-ink-500 text-xs">ou</span>
            <div className="flex-grow border-t border-cream-900/50"></div>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button 
            type="submit"
            className="w-full bg-white text-ink-900 border border-cream-900/50 rounded-lg py-3 flex items-center justify-center gap-3 uppercase text-xs tracking-widest font-bold hover:bg-cream-50 transition-colors"
          >
            {/* Simple Google G */}
            <span className="font-serif font-bold text-lg leading-none">G</span>
            Continuar com Google
          </button>
        </form>

      </div>
    </div>
  );
}
