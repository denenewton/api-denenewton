import client from "@/lib/client";
import { gql } from "@apollo/client";

export default async function Home() {
  const { data, loading, error } = await client.query({
    query: gql`
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
    `,
  });
  if (loading) return "Loading....";
  return (
    <>
      <div className="text-center">
        <h1 className="font-light text-slate-700 text-3xl py-5">Api Movies!</h1>
        <p className="font-extralight text-xs mt-[-12px]">
          <a href="http://localhost:3000/api/graphql">http://localhost:3000/api/graphql</a>
        </p>
      </div>
      <ul className="w-full bg-slate-100">
        {data.movies.map((el) => (
          <>
            <li key={el.id} className="w-full py-5">
              <div className="w-96 m-auto bg-white flex justify-between gap-x-5 rounded-md shadow-sm py-2 px-3 ">
                <div className="w-50 h-40  rounded-full">
                  <img
                    className="w-[100%] h-[100%] object-cover rounded-full"
                    src={el.backdrop_path}
                    alt={el.title}
                  />
                </div>
                <div className="w-full flex flex-col justify-center text-gray-500 text-[13px]">
                  <a href={el.homepage}> <h2 className="text-2xl font-normal">{el.title}</h2></a>
                  <p className="font-extralight">
                    <span className="text-gray-900">Release Date: </span>{" "}
                    {el.release_date}
                  </p>
                  <p className="font-extralight">
                    <span className="text-gray-900">Budget:</span> ${el.budget}
                  </p>
                  <p className="font-extralight">
                    <span className="text-gray-900">Vote average:</span>{" "}
                    {el.vote_average}
                  </p>
                  {el.production_countries.map((el) => (
                    <p key={el.id} className="font-extralight">
                      {el.name}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}