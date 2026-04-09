import LoginForm from "@/components/auth/LoginForm";
import { Heart } from "lucide-react";

export default function PortalLoginPage() {
  return (
    <div className="min-h-screen bg-cream-500 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md flex flex-col gap-8">
        
        {/* Memory branding */}
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-peach-500 animate-pulse-slow">
                <Heart className="w-8 h-8 fill-current" />
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-serif text-3xl text-ink-900 font-light tracking-wide">Portal da Família</h1>
                <p className="text-sm text-ink-500 font-medium italic">Honrando histórias, preservando memórias.</p>
            </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-cream-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sage-600"></div>
          
          <LoginForm 
            redirectTo="/portal" 
            portalTitle="Acesse seu Memorial" 
          />

          <div className="mt-8 pt-8 border-t border-cream-900/20 text-center">
            <p className="text-xs text-ink-400 font-medium">Ainda não possui acesso? <br/> 
                <span className="text-sage-600">O acesso é enviado por e-mail após a contratação.</span>
            </p>
          </div>
        </div>

        <div className="text-center">
            <p className="text-[10px] text-ink-300 uppercase font-bold tracking-[0.3em]">Homenagem e Respeito em cada detalhe.</p>
        </div>
      </div>
    </div>
  );
}
