import { requireAuth } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Church, 
  Users, 
  CreditCard, 
  LogOut,
  Bell,
  Settings,
  Grid3X3
} from "lucide-react";

export default async function IgrejaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  async function handleSignOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  if (user.tipo !== "ADMIN_PAROQUIA" && user.tipo !== "ADMIN_GERAL") {
    redirect("/login");
  }

  const menuItems = [
    { name: "Painel Geral", icon: LayoutDashboard, href: "/igreja" },
    { name: "Meus Nichos", icon: Grid3X3, href: "/igreja/nichos" },
    { name: "Meus Clientes", icon: Users, href: "/igreja/clientes" },
    { name: "Financeiro", icon: CreditCard, href: "/igreja/financeiro" },
  ];

  return (
    <div className="flex min-h-screen bg-cream-500 font-sans selection:bg-sage-100 selection:text-sage-900">
      
      {/* Sidebar Sidebar */}
      <aside className="w-80 border-r border-cream-900/20 flex flex-col p-8 gap-10 bg-white/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3 px-2">
            <div className="w-6 h-10 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 rounded-full bg-ink-900 absolute top-2"></div>
            </div>
            <div className="flex flex-col">
                <span className="font-serif text-xs uppercase tracking-widest text-ink-900 font-bold">Painel Paroquial</span>
                <span className="text-[9px] text-ink-400 uppercase font-black tracking-tighter">Gestão Unificada</span>
            </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-ink-500 hover:bg-white hover:text-sage-600 hover:shadow-sm transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold tracking-widest">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
            <div className="p-6 bg-sage-900 rounded-3xl text-white flex flex-col gap-2">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-50">Logado como paróquia</span>
                <span className="text-sm font-medium truncate">{user.nome}</span>
            </div>
            
            <form action={handleSignOut}>
                <button
                    type="submit"
                    className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-50 transition-all group"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Sair do Painel</span>
                </button>
            </form>
        </div>
      </aside>

      {/* Main Area Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-24 px-12 flex items-center justify-between border-b border-cream-900/10">
            <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-sage-500 animate-pulse"></div>
                 <span className="text-[10px] uppercase font-black tracking-[0.3em] text-ink-400">Sistema Online</span>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative p-2 text-ink-500 hover:text-sage-600 transition">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-peach-500 rounded-full border-2 border-cream-500"></span>
                </button>
                <div className="h-8 w-[1px] bg-cream-900/20"></div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 border border-sage-200">
                        <Settings className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>

        <main className="p-12">
            {children}
        </main>
      </div>

    </div>
  );
}
