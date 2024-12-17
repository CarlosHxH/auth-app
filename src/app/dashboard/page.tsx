import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import LogoutButton from '@/components/LogoutButton'
import Image from 'next/image'
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4">
        <p>Welcome to your protected dashboard, {session.user.name ?? 'User'}!</p>
        {session.user.image && (
          <Image
            width={500}
            height={500} 
            src={session.user.image} 
            alt="Profile" 
            className="rounded-full w-24 h-24 mt-4"
          />
        )}
        <LogoutButton />
      </div>
    </div>
  )
}