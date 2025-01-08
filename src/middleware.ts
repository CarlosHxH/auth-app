// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";

export default withAuth(async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isAdmin = token && token.role === "ADMIN";
  


  // Verifique se o token existe
  if (!token) {
    // Redirecione para a página de login se não estiver autenticado
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (isDashboardRoute && !isAdmin) {
    // Redireciona para a página de login se não for admin tentando acessar /dashboard
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  
  // Se o token existir, continue com a requisição
  return NextResponse.next();
},
{
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Defina as rotas que você deseja proteger
export const config = {
  matcher: [
    "/", // Rota inicial
    "/api/:path*", // Todas as rotas API
    "/inspection/:path*", // Todas as rotas de inspeção protegidas
    "/dashboard/:path*", // Todas as rotas do painel protegidas
  ], // Rotas protegidas
};
