// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verifica se o token existe
  if (!token) {
    // Redireciona para a página de login se não estiver autenticado
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }
  // Se o token existir, permite o acesso à rota
  return NextResponse.next();
}

// Define as rotas que o middleware deve proteger
export const config = {
  matcher: ['/admin/:path*','/dashboard/:path*','/'], // Altere para as rotas que você deseja proteger
};