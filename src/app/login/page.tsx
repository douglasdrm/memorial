"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Credenciais inválidas. Verifique e tente novamente.");
      setLoading(false);
      return;
    }

    // Busca o perfil para descobrir o tipo e status
    const resp = await fetch("/api/auth/perfil");
    const perfil = await resp.json();

    if (perfil.status === "PENDENTE") {
      await supabase.auth.signOut();
      setError("Sua conta ainda está pendente de aprovação pelo administrador.");
      setLoading(false);
      return;
    }

    if (perfil.status === "SUSPENSO") {
      await supabase.auth.signOut();
      setError("Sua conta foi suspensa. Entre em contato com o administrador.");
      setLoading(false);
      return;
    }

    if (perfil.tipo === "ADMIN_GERAL" || perfil.tipo === "GERENTE") {
      router.push("/admin");
    } else if (perfil.tipo === "ADMIN_PAROQUIA") {
      router.push("/igreja");
    } else {
      router.push("/meu-memorial");
    }
  };

  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-8 h-12 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative mb-4">
            <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-3" />
          </div>
          <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
            Memorial<br />Paroquial
          </h1>
          <p className="text-ink-500 text-sm mt-3 font-medium">Acesso Restrito</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg text-center mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          </div>

          <div className="flex justify-end">
            <Link href="/recuperar-senha" className="text-xs text-sage-600 hover:text-sage-800 transition">
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-cream-900/30" />
          <span className="shrink-0 px-4 text-ink-400 text-xs">ou</span>
          <div className="flex-grow border-t border-cream-900/30" />
        </div>

        <Link
          href="/solicitar-acesso"
          className="block w-full text-center border border-sage-600 text-sage-700 rounded-lg py-3 text-xs tracking-widest font-bold hover:bg-sage-50 transition-colors uppercase"
        >
          Solicitar Acesso como Gerente
        </Link>
      </div>
    </div>
  );
}
