import axios from "axios";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.TOKEN_API_MOVIE,
  },
};

export const Axios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

////////////////FILTERING MOVIES///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function filtering(title = "", genre = "", year = "", Movie) {
  try {
    let movies = await Movie.find()
      .and([
        {
          title: { $regex: title, $options: "i" },
          release_date: { $regex: year, $options: "i" },
          "genres.name": { $regex: genre, $options: "i" },
        },
      ])
      .sort("title")
      .select("-casts -__v -date");
    //.countDocuments();
    return movies;
  } catch (ex) {
    throw new Error(ex);
  }
}
////////////////GET//PAGES//DOES//PAGINATION///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export function getPage(array, page, perPage) {
  const obj = new Object();
  const start = (page - 1) * perPage; // start == offset
  const end = page * perPage;
  obj.results = array.slice(start, end);
  if (obj.results.length === 0) {
    return obj;
  }
  if (page > 1) {
    obj.prev = page - 1;
  }
  if (end < array.length) {
    obj.next = page + 1;
  }
  if (obj.results.length <= array.length) {
    obj.page = page;
    obj.total_pages = Math.ceil(array.length / perPage);
    obj.total_results = array.length;
    obj.per_page = perPage;
  }
  return obj;
}

////////////////GET//MOVIE//BY//ID//URL_MOVIE//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getMovieMaped(el, Movie) {
  try {
    const resp = await Axios.get(`/movie/${el.id}?language=en-US`, options);
    let _movie = await resp.data;
    _movie = {
      ..._movie,
      id: el.id,
      backdrop_path:
        "https://image.tmdb.org/t/p/original" + _movie.backdrop_path,
      url_image: el.url_image,
      url_movie: el.url_movie,
    };
    var newMovie = await new Movie({
      ..._movie,
    });
    await newMovie
      .save(_movie)
      .then(
        () => console.log("Data inserted") // Success
      )
      .catch(
        (error) => console.log(error) // Failure
      );
  } catch (error) {
    return {
      __typename: "Error",
      errors: error.message,
    };
  }
}
