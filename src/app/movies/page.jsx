
import client from "@/lib/client";
import { gql } from "@apollo/client";

export default async function Page() {
  const { data, loading, error } = await client.query({query: gql`
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
        production_companies {
          name
          origin_country
        }
        production_countries {
          name
        }
      }
    }
  `});
  return (
    <>
      <h1>Api Movies!</h1>
      {data.movies.map((el) => el.title)}
    </>
  );
}
