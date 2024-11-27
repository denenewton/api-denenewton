import { Axios, getPage, options, filtering } from "../../../utils";
import { genres } from "../../../utils/genres.js";

const resolvers = {
  MovieAndCast: {
    genres: async (_, __, ___) => {
      const _genres = [];
      genres.forEach((el) => {
        _.genre_ids.forEach((id) => {
          if (id === el.id) _genres.push(el);
        });
      });
      return _genres;
    },
  },
  SearchMovies: {
    per_page: async (_, __, ___) => {
      if (_.total_pages == _.page) return _.total_results % 20;
      return 20;
    },
  },

  Movie: {
    casts: async (_, __, ___) => {
      try {
        const resp = Axios.get(
          `/movie/${_.id}/credits?language=en-US`,
          options
        );
        return (await resp).data.cast;
      } catch (error) {
        return {
          __typename: "Error",
          errors: error.message,
        };
      }
    },
  },
  Query: {
    movies: async (
      _,
      { filter = { title: "", genre: "", year: "" } },
      { Movie }
    ) => {
      const { title, genre, year } = filter;
      try {
        const movies = await filtering(title, genre, year, Movie);

        if (movies.length === 0) {
          return [
            {
              __typename: "Error",
              errors: "Sorry, this movie does not exist in our database.",
            },
          ];
        }
        return movies;
      } catch (error) {
        return [
          {
            __typename: "Error",
            errors: error.message,
          },
        ];
      }
    },

    movie: async (_, { id }, __) => {
      try {
        const resp = Axios.get(`/movie/${id}?language=en-US`, options);
        const movie = (await resp).data;
        return movie;
      } catch (error) {
        return {
          __typename: "Error",
          errors: error.message,
        };
      }
    },
    searchMovieFromData: async (
      _,
      { filter = { title: "", genre: "", year: "" }, page, perPage },
      { Movie }
    ) => {
      const { title, genre, year } = filter;

      try {
        const movies = await filtering(title, genre, year, Movie);
        if (!movies) {
          return {
            __filename: "Error",
            errors: "Sorry, we cannot find anything in our database.",
          };
        }
        const infoPage = getPage(movies, page, perPage);

        return infoPage;
      } catch (error) {
        return {
          __filename: "Error",
          errors: error.message,
        };
      }
    },

    searchMovieFromApi: async (_, { filter }, __) => {
      var _title = filter.title ? filter.title : "a";
      var _year = filter.year ? filter.year : "20";
      var _page = filter.page ? filter.page : 1;

      try {
        const resp = Axios.get(
          `/search/movie?query=${_title}&include_adult=false
            &language=en-US&primary_release_year=${_year}&page=${_page}`,
          options
        );
        return (await resp).data;
      } catch (error) {
        console.log(error);

        return {
          __typename: "Error",
          errors: error.message,
        };
      }
    },

    getCast: async (_, { id }, __) => {
      try {
        const resp = Axios.get(`/movie/${id}/credits?language=en-US`, options);
        return (await resp).data;
      } catch (error) {
        console.log(error);

        return {
          __typename: "Error",
          errors: error.message,
        };
      }
    },

    getPerson: async (_, { id }, __) => {
      try {
        const resp = Axios.get(`/person/${id}?language=en-US`, options);
        return (await resp).data;
      } catch (error) {
        console.log(error);

        return {
          __typename: "Error",
          errors: error.message,
        };
      }
    },
  },

  SearchMoviePayload: {
    __resolveType: (obj) => {
      if (obj.errors) {
        return "Error";
      }
      if (obj.total_results || obj.page || obj.total_pages || obj.results) {
        return "SearchMovies";
      }
      return null;
    },
  },

  Mutation: {
    saveMovies: async (_, { id }, { Movie }) => {
      await getMovieMaped({ id: id }, Movie);
    },
  },

  MoviePayload: {
    __resolveType: (obj) => {
      if (obj.errors) {
        return "Error";
      }
      if (obj.budget || obj.homepage || obj.origin_country) {
        return "Movie";
      }
      return null;
    },
  },

  SearchCastsPayload: {
    __resolveType: (obj) => {
      if (obj.errors) {
        return "Error";
      }
      if (obj.cast || obj.crew) {
        return "Cast";
      }
      return null;
    },
  },

  PersonPayload: {
    __resolveType: (obj) => {
      if (obj.errors) {
        return "Error";
      }
      if (
        obj.biography ||
        obj.birthday ||
        obj.also_known_as ||
        obj.place_of_birth
      ) {
        return "Person";
      }
      return null;
    },
  },

  SearchMovieFromDataPayload: {
    __resolveType: (obj) => {
      if (obj.errors) {
        return "Error";
      }
      if (
        obj.total_results ||
        obj.page ||
        obj.total_pages ||
        obj.results ||
        obj.next ||
        obj.prev ||
        obj.per_page
      ) {
        return "SearchMoviesFromData";
      }
      return null;
    },
  },
};

//  Mutation: {
//     saveMovies: async (_, __, { movies, Movie }) => {
//       await movies.forEach(async (el) => {
//        await getMovieMaped(el, Movie);
//       });
//     },
//  },
// movies: async (_, __, { movies }) => {
//   let _mov = await movies.map(async (el) => {
//     try {
//       const resp = await Axios.get(
//         `/movie/${el.id}?language=en-US`,
//         options
//       );
//       return await resp.data;
//     } catch (error) {
//       return {
//         __typename: "Error",
//         errors: error.message,
//       };
//     }
//   });
//   return _mov;
// },

export default resolvers;
