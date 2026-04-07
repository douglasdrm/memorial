import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Church, 
  Grip, 
  BookOpen, 
  CreditCard, 
  LogOut,
  User,
  Bell,
  FileText
} from "lucide-react";
import { signOut } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Paróquias", icon: Church, href: "/admin/paroquias" },
    { name: "Concessões", icon: FileText, href: "/admin/concessoes" },
    { name: "Memoriais", icon: BookOpen, href: "/admin/memoriais" },
    { name: "Pagamentos", icon: CreditCard, href: "/admin/pagamentos" },
  ];

  return (
    <div className="flex min-h-screen bg-cream-500 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-cream-900/50 flex flex-col fixed inset-y-0 left-0 z-50">
        {/* Logo Area */}
        <div className="p-8 border-b border-cream-900/30">
          <div className="flex items-center gap-3">
            <div className="w-6 h-9 border-2 border-ink-900 rounded-t-full flex items-center justify-center relative">
              <div className="w-1.5 h-1.5 rounded-full bg-ink-900 absolute top-2"></div>
            </div>
            <h1 className="font-serif text-lg leading-tight uppercase tracking-widest text-ink-900">
              Memorial<br />Paroquial
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-ink-500 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-cream-900/30">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-peach-100 rounded-xl transition-all w-full text-left">
              <LogOut className="w-5 h-5" />
              Sair do Sistema
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Topbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-cream-900/50 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-ink-500 text-sm font-medium">
            Painel <span className="text-cream-900 mx-1">/</span> <span className="text-ink-900">Visão Geral</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-ink-500 hover:text-sage-600 transition p-2 bg-cream-50 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-peach-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-cream-900/30 pl-6 text-right">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-ink-900">{session.user?.name || "Administrador"}</span>
                <span className="text-[10px] uppercase font-bold text-sage-600 tracking-widest leading-none">
                  {(session.user as any)?.role || "Admin"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-600 font-bold">
                {session.user?.name?.[0] || <User className="w-5 h-5" />}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
