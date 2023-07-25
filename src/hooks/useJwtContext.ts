import { useContext } from 'react'

import { JwtContext, JwtContextData } from '@/context/jwt-context'

export const useJwtContext = (): JwtContextData => {
  const context = useContext(JwtContext)

  if (!context) {
    throw new Error('useJwtContext deve ser usado dentro de um JwtProvider')
  }

  return context
}
