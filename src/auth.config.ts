import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [], // Providers que usarem Node puro vão pro auth.ts principal
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user as any;
      const role = user?.role || user?.tipo;
      
      const isOnLogin = nextUrl.pathname === "/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnIgreja = nextUrl.pathname.startsWith("/igreja");
      const isOnPortal = nextUrl.pathname.startsWith("/meu-memorial");

      // BLOQUEIO DE SEGURANÇA: Se não estiver logado e tentar área restrita
      if (!isLoggedIn && (isOnAdmin || isOnIgreja || isOnPortal)) {
        return false; 
      }

      // REDIRECIONAMENTO INTELIGENTE: Se já logado e tentar acessar o login ou a home
      if (isLoggedIn && (isOnLogin || nextUrl.pathname === "/")) {
        if (role === "ADMIN_GERAL") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        if (role === "ADMIN_PAROQUIA") {
          return Response.redirect(new URL("/igreja", nextUrl));
        }
        if (role === "FAMILIA") {
          return Response.redirect(new URL("/meu-memorial", nextUrl));
        }
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
