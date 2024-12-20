// /src/components/LoginForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material'

export default function LoginForm() {
  // Hydration-safe state
  const [mounted, setMounted] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string | null>(null)

  // Ensure component only renders on client
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!credentials.email || !credentials.password) {
      setError('Por favor, preencha todos os campos')
      setIsLoading(false)
      return
    }

    if (!isLogin && credentials.password !== credentials.confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
        type: isLogin ? 'login' : 'signup'
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) { window.location.href = '/' }
      setIsLoading(false)
    } catch (err:unknown) {
      console.log(err);
      setError('Erro ao processar o login')
      setIsLoading(false)
    }
  }

  // Prevent server-side rendering of dynamic content
  if (!mounted) {
    return null
  }


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials, 
          email: e.target.value
        })}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials, 
          password: e.target.value
        })}
      />

      {!isLogin && (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar Senha"
          type="password"
          id="confirmPassword"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({
            ...credentials, 
            confirmPassword: e.target.value
          })}
        />
      )}

      {error && (
        <Typography 
          color="error" 
          variant="body2" 
          align="center" 
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          isLogin ? 'Entrar' : 'Cadastrar'
        )}
      </Button>

      <Button
        fullWidth
        variant="text"
        color="primary"
        onClick={() => setIsLogin(!isLogin)}
        disabled={isLoading}
        sx={{ mb: 2 }}
      >
        {isLogin 
          ? 'Criar nova conta' 
          : 'Já tem conta? Fazer login'}
      </Button>

    </Box>
  )
}