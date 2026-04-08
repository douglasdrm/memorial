"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  portalTitle: string;
  portalSubtitle: string;
  allowedRoles: string[];
  redirectPath: string;
  showRequestAccess?: boolean;
}

export default function LoginForm({
  portalTitle,
  portalSubtitle,
  allowedRoles,
  redirectPath,
  showRequestAccess = false,
}: LoginFormProps) {
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

    if (!perfil || !allowedRoles.includes(perfil.tipo)) {
      await supabase.auth.signOut();
      setError("Este usuário não tem permissão para acessar este portal.");
      setLoading(false);
      return;
    }

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

    router.push(redirectPath);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-8 h-12 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative mb-4">
          <div className="w-2 h-2 rounded-full bg-ink-900 absolute top-3" />
        </div>
        <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
          Memorial<br />Paroquial
        </h1>
        <div className="mt-3 flex flex-col items-center">
            <span className="text-ink-900 text-[10px] font-black uppercase tracking-[0.2em]">{portalTitle}</span>
            <p className="text-ink-500 text-[10px] font-medium uppercase tracking-widest mt-1 opacity-60">{portalSubtitle}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg text-center mb-6 border border-red-200 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-ink-900 uppercase tracking-wider">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-3 bg-cream-50 border border-cream-900/30 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition text-sm"
            placeholder="seu@email.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-ink-900 uppercase tracking-wider">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pr-12 bg-cream-50 border border-cream-900/30 rounded-xl outline-none focus:border-sage-500 focus:bg-white transition text-sm"
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
          <Link href="/recuperar-senha" className="text-[10px] uppercase font-bold text-sage-600 hover:text-sage-800 transition tracking-widest">
            Recuperar Senha
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sage-600 text-white rounded-xl py-4 mt-2 uppercase text-[10px] tracking-[0.2em] font-black shadow-md hover:bg-sage-900 transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Autenticando..." : "Entrar no Painel"}
        </button>
      </form>

      {showRequestAccess && (
        <>
            <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-cream-900/20" />
                <span className="shrink-0 px-4 text-ink-300 text-[10px] font-bold uppercase tracking-[0.2em]">ou</span>
                <div className="flex-grow border-t border-cream-900/20" />
            </div>

            <Link
                href="/solicitar-acesso"
                className="block w-full text-center border-2 border-sage-600/20 text-sage-700 rounded-xl py-3.5 text-[10px] tracking-[0.2em] font-black hover:bg-sage-50 hover:border-sage-600/40 transition-all uppercase"
            >
                Solicitar Acesso Gerencial
            </Link>
        </>
      )}
    </div>
  );
}
