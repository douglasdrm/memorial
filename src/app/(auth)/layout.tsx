import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-500 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Soft Decoration */}
      <div className="w-96 h-96 bg-sage-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
      <div className="w-96 h-96 bg-peach-500/5 rounded-full blur-3xl absolute -bottom-20 -right-20" />
      
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-cream-900/50 relative z-10">
        {children}
      </div>
    </div>
  );
}
