'use client'

import Cookies from 'js-cookie'

import { useState, useEffect, createContext } from 'react'

import { toast } from '@/components/ui/use-toast'

export interface JwtContextData {
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  logout: () => void
}

interface JwtProviderProps {
  children: React.ReactNode
}

export const JwtContext = createContext<JwtContextData>({
  token: '',
  setToken: () => {},
  logout: () => {},
})

export const JwtProvider = ({ children }: JwtProviderProps) => {
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    if (token) {
      Cookies.set('accessToken', token, { expires: 7 })
    }
  }, [token])

  async function logout() {
    Cookies.remove('accessToken')
    setToken('')

    toast({
      title: 'Deslogado com sucesso!',
      description: 'Estamos te redirecionando para tela de login...',
      className: 'bg-green-500 text-white',
    })
  }

  return (
    <JwtContext.Provider value={{ token, setToken, logout }}>
      {children}
    </JwtContext.Provider>
  )
}
