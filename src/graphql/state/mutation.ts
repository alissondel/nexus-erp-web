import { gql } from '@apollo/client'

export const CREATE_STATE = gql`
  mutation createState($data: CreateStateInput!) {
    createState(data: $data) {
      id
      name
      uf
    }
  }
`

export const UPDATE_STATE = gql`
  mutation updateState($data: UpdateStateInput!, $id: Float!) {
    updateState(data: $data, id: $id) {
      id
      name
      uf
    }
  }
`

export const DELETE_STATE = gql`
  mutation deleteState($id: Float!) {
    deleteState(id: $id) {
      id
      name
      uf
    }
  }
`

/* Exemplo com Fetch API */

// import { getAuthToken } from "@/auth"

// export async function fetchCreateState(data: any) {
//   const GRAPHQL_ENDPOINT = "http://localhost:8080/graphql"
//   const accessToken = getAuthToken()

//   try {
//     const response = await fetch(GRAPHQL_ENDPOINT, {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: accessToken ? accessToken : "",
//       },
//       body: JSON.stringify({
//         query: CREATE_STATE,
//         variables: {
//           data: {
//             name: data?.name,
//             uf: data?.uf
//           }
//         }
//       })
//     })

//     const resultMutaion = await response.json()
//     return resultMutaion
//   } catch(e) {
//     console.error(e);
//  }
// }
