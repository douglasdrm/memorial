import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Bypass Prisma for authorize to avoid SSL issues on Vercel
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        
        try {
            const client = await pool.connect();
            const res = await client.query('SELECT * FROM "Usuario" WHERE email = $1', [credentials.email]);
            client.release();
            const user = res.rows[0];

            if (!user || !user.senhaHash) {
                await pool.end();
                return null;
            }

            const isValid = await bcrypt.compare(
                credentials.password as string,
                user.senhaHash
            );

            await pool.end();
            if (!isValid) return null;

            return {
                id: user.id,
                email: user.email,
                name: user.nome,
                role: user.tipo,
            };
        } catch (err) {
            console.error("Erro no authorize (pg bypass):", err);
            await pool.end();
            return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || (user as any).tipo;
      }

      // Se o token já existe mas não tem role, busca no banco (importante para Social Login)
      if (token.id && !token.role) {
        const dbUser = await prisma.usuario.findUnique({
          where: { id: token.id as string },
          select: { tipo: true }
        });
        if (dbUser) {
          token.role = dbUser.tipo;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
