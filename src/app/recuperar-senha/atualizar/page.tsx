"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AtualizarSenhaPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      setError("Erro ao atualizar senha. O link pode ter expirado.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    
    // Redireciona após 3 segundos
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-sage-600" size={24} />
          </div>
          <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
            Nova Senha
          </h1>
          <p className="text-ink-500 text-sm mt-3 font-medium text-center">
            Defina sua nova senha de acesso.
          </p>
        </div>

        {success ? (
          <div className="bg-sage-50 border border-sage-200 p-6 rounded-2xl text-center">
            <h3 className="text-sage-900 font-bold mb-2">Senha alterada!</h3>
            <p className="text-sage-700 text-sm">
              Sua senha foi atualizada com sucesso. Você será redirecionado para o login em instantes...
            </p>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg text-center border border-red-200">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Nova Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-[10px] text-ink-400 mt-1 italic italic">Mínimo de 6 caracteres.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors disabled:opacity-60"
            >
              {loading ? "Atualizando..." : "Definir Nova Senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
