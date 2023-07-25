import { gql } from '@apollo/client'

export const GET_STATES = gql`
  query states($filters: FilterStateInput!, $perPage: Int, $currentPage: Int) {
    states(perPage: $perPage, currentPage: $currentPage, filters: $filters) {
      items {
        id
        name
        uf
        active
      }
      pagination {
        count
        pagesCount
        perPage
        currentPage
      }
    }
  }
`
