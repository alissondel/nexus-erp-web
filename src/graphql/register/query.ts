import { gql } from '@apollo/client'

export const GET_CITIES = gql`
  query cities($filters: FilterCityInput!, $perPage: Int, $currentPage: Int) {
    cities(perPage: $perPage, currentPage: $currentPage, filters: $filters) {
      items {
        id
        name
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
