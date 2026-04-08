"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/recuperar-senha/atualizar`,
    });

    if (resetError) {
      setError("Erro ao enviar email de recuperação. Verifique o email informado.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">
        
        <Link href="/portal/login" className="inline-flex items-center text-ink-400 hover:text-ink-900 text-sm mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para o Login
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="text-sage-600" size={24} />
          </div>
          <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
            Recuperar Senha
          </h1>
          <p className="text-ink-500 text-sm mt-3 font-medium text-center">
            Enviaremos um link de redefinição para o seu email.
          </p>
        </div>

        {success ? (
          <div className="bg-sage-50 border border-sage-200 p-6 rounded-2xl text-center">
            <h3 className="text-sage-900 font-bold mb-2">Email enviado!</h3>
            <p className="text-sage-700 text-sm">
              Verifique sua caixa de entrada e siga as instruções para definir sua nova senha.
            </p>
            <Link 
              href="/portal/login"
              className="mt-6 block w-full bg-sage-600 text-white rounded-lg py-3 text-xs tracking-widest font-bold uppercase"
            >
              Entendido
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg text-center border border-red-200">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
                placeholder="seu@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
