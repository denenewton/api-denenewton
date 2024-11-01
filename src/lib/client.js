import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

 const client = new ApolloClient({
  uri: 'https://api-denenewton.vercel.app/api/graphql',
  cache: new InMemoryCache()
})

export default client

export const QUERY_MOVIES = gql`
  query {
    movies {
      id
      title
      vote_average
      vote_count
      poster_path
      popularity
      release_date
      budget
      backdrop_path
      overview
      homepage
      production_companies {
        name
        origin_country
      }
      production_countries {
        name
      }
    }
  }
`;
