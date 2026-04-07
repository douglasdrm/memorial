import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Eye, 
  PenTool,
  Clock
} from "lucide-react";

export default async function FamiliaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || (session.user as any).role !== "FAMILIA" && (session.user as any).role !== "ADMIN_GERAL") {
    redirect("/login");
  }

  const menuItems = [
    { name: "Minhas Homenagens", icon: Heart, href: "/meu-memorial" },
    { name: "Moderar Mensagens", icon: MessageSquare, href: "/meu-memorial/mensagens" },
    { name: "Configurações", icon: Settings, href: "/meu-memorial/configuracoes" },
  ];

  return (
    <div className="min-h-screen bg-peach-50 font-sans selection:bg-peach-100 selection:text-ink-900">
      
      {/* Top Navbar for Family Portal */}
      <nav className="h-20 bg-white/70 backdrop-blur-md border-b border-peach-900/10 fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12">
        <Link href="/meu-memorial" className="flex items-center gap-2 group">
            <div className="w-5 h-8 border border-peach-900 rounded-t-full flex items-center justify-center relative group-hover:bg-peach-600 transition-colors">
              <div className="w-1 h-1 rounded-full bg-peach-900 group-hover:bg-white absolute top-2"></div>
            </div>
            <span className="font-serif text-sm uppercase tracking-[0.2em] font-medium text-ink-900">Portal da Família</span>
        </Link>
        <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
                <span className="text-[10px] uppercase font-bold text-ink-400 tracking-widest">Bem-vindo(a)</span>
                <span className="text-sm font-medium text-ink-900">{session.user?.name}</span>
            </div>
            <Link 
                href="/api/auth/signout" 
                className="p-3 bg-white border border-peach-900/20 rounded-full hover:bg-red-50 text-red-400 transition shadow-sm"
            >
                <LogOut className="w-5 h-5" />
            </Link>
        </div>
      </nav>

      <div className="pt-20 flex max-w-7xl mx-auto">
        {/* Sidebar Nav */}
        <aside className="w-72 pt-10 hidden md:flex flex-col gap-4 sticky top-20 h-[calc(100vh-80px)] px-6 overflow-y-auto">
             {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-4 px-6 py-4 rounded-3xl text-ink-500 hover:bg-white hover:text-peach-600 hover:shadow-sm transition-all group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">{item.name}</span>
                </Link>
              ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
            {children}
        </main>
      </div>

    </div>
  );
}
