"use client";

import { solicitarAcesso } from "@/lib/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";

export default function SolicitarAcessoPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    try {
      await solicitarAcesso(formData);
    } catch (err: any) {
      setError(err.message || "Erro ao processar solicitação.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">
        
        <Link href="/admin/login" className="inline-flex items-center text-ink-400 hover:text-ink-900 text-sm mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Voltar para o Login
        </Link>

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="text-sage-600" size={24} />
          </div>
          <h1 className="font-serif text-2xl text-ink-900 uppercase tracking-widest text-center leading-tight">
            Solicitar Acesso
          </h1>
          <p className="text-ink-500 text-sm mt-3 font-medium text-center">
            Cadastre-se como Gerente. Seu acesso será revisado pelo administrador.
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 text-red-800 text-sm p-3 rounded-lg text-center border border-red-200">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Nome Completo</label>
            <input
              type="text"
              name="nome"
              required
              className="px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
              placeholder="Ex: João da Silva"
            />
          </div>

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
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Telefone</label>
            <input
              type="tel"
              name="telefone"
              className="px-4 py-3 bg-cream-50 border border-cream-900/50 rounded-lg outline-none focus:border-sage-500 focus:bg-white transition"
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-ink-900 uppercase tracking-wider">Defina uma Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-600 text-white rounded-lg py-3.5 mt-2 uppercase text-xs tracking-widest font-bold shadow-md hover:bg-sage-900 transition-colors disabled:opacity-60"
          >
            {loading ? "Processando..." : "Enviar Solicitação"}
          </button>
        </form>
      </div>
    </div>
  );
}
