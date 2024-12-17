// /src/app/layout.tsx
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import MuiProvider from '@/components/MuiProvider'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'Aplicação',
  description: 'Aplicação com autenticação NextAuth',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body>
        <MuiProvider>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </MuiProvider>
      </body>
    </html>
  )
}