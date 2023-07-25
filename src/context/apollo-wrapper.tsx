'use client'

import { ReactNode, createContext } from 'react'

import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'

import { getAuthToken } from '@/function'

interface ApolloClientPoviderProps {
  children: ReactNode
}

export const ApolloContext: any = createContext({
  createApolloClient: () => Promise.resolve(),
})

export function ApolloClientProvider({ children }: ApolloClientPoviderProps) {
  function createApolloClient() {
    const accessToken = getAuthToken()

    const nexusLink = new HttpLink({
      uri: 'http://localhost:8080/graphql',
      headers: {
        authorization: accessToken || '',
      },
    })

    return new ApolloClient({
      link: nexusLink,
      cache: new InMemoryCache(),
      credentials: 'include',
    })
  }

  return (
    <ApolloProvider client={createApolloClient()}>{children}</ApolloProvider>
  )
}
