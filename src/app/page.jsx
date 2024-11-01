import client, { QUERY_MOVIES } from "@/lib/client";


export default async function Home() {
  const { data, loading, error } = await client.query({ query: QUERY_MOVIES });
  
  if (loading) return "Loading....";

  return (
    <div className="w-full h-screen grid grid-rows-[8rem 1fr] grid-cols-1">
      <div className="w-full text-center bg-white z-0  shadow-md shadow-pink-500">
        <h1 className="font-light text-slate-700 text-3xl py-5">Api Movies!</h1>
        <p className="font-extralight text-xs mt-[-14px] mb-1">
          <a href="https://api-denenewton.vercel.app/api/graphql">
           https://api-denenewton.vercel.app/api/graphql
          </a>
        </p>
      </div>

      {data && (
        <ul className="w-full overflow-y-auto pt-3 bg-purple-50">
          {data.movies.map((el) => (
            <li key={el.original_title} className="w-full py-5">
              <div className="w-96 m-auto bg-white flex justify-between gap-x-5 rounded-md shadow-sm py-2 px-3 ">
                <div className="w-50 h-40  rounded-full">
                  <img
                    className="w-[100%] h-[100%] object-cover rounded-full"
                    src={el.backdrop_path}
                    alt={el.title}
                  />
                </div>
                <div className="w-full flex flex-col justify-center text-gray-500 text-[13px]">
                  <a href={el.homepage}>
                    {" "}
                    <h2 className="text-2xl font-normal">{el.title}</h2>
                  </a>
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
          ))}
        </ul>
      )}
    </div>
  );
}
