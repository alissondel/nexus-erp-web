import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation authenticate($data: AuthInput!) {
    authenticate(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
