import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

// User model for database storage
async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: email.split('@')[0],
      role: 'user'
    }
  })
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', // Use JWT instead of database sessions
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        type: { label: "Action", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Handle login or signup based on type
        if (credentials.type === 'signup') {
          // Signup logic
          const existingUser = await prisma.user.findUnique({where: { email: credentials.email }})

          if (existingUser) throw new Error('User already exists');

          const user = await createUser( credentials.email, credentials.password)

          return { id: user.id, email: user.email, name: user.name, role: user.role }
        } else {
          // Login logic
          const user = await prisma.user.findUnique({where: { email: credentials.email }});
          
          if (!user) throw new Error('No user found');

          const isValid = await bcrypt.compare(
            credentials.password, 
            user.password || ''
          )

          if (!isValid) throw new Error('Invalid password');

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: "",
            role: 'user'
          }
        }
      }
    })
  ],
  callbacks: {
    // Customize token
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      return token
    },
    // Customize session
    async session({ session, token }) {
      
      if (session.user) {
        session.user.id = token.sub as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET
}