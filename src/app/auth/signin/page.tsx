// /src/app/auth/signin/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Container, Typography, Paper } from '@mui/material'
import { authOptions } from '@/lib/auth'
import LoginForm from '@/components/LoginForm'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  
  // Redirect if already logged in
  if (session) {
    redirect('/')
  }

  return (
    <main>
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper 
        elevation={6} 
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ mb: 2 }}
        >
          Login
        </Typography>

        <LoginForm/>
      </Paper>
    </Container>
    </main>
  )
}