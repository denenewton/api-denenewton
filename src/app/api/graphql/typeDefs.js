import { gql } from "graphql-tag";

const typeDefs = gql`
  type MovieAndCast {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    genres: [Genre]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  type SearchMovies {
    total_pages: Int
    total_results: Int
    per_page: Int
    page: Int
    results: [MovieAndCast]
  }
    

  type Actor {
    id: Int
    adult: Boolean
    gender: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    cast_id: Int
    character: String
    credit_id: String
    order: Int
  }

  type Crew {
    id: Int
    adult: Boolean
    gender: Int
    known_for_department: String
    name: String
    original_name: String
    popularity: Float
    profile_path: String
    credit_id: Int
    department: String
    job: String
  }

  type Cast {
    id: Int
    cast: [Actor]
    crew: [Crew]
  }

  type Person {
    adult: Boolean
    also_known_as: [String]
    biography: String
    birthday: String
    deathday: String
    gender: Int
    homepage: String
    id: Int
    imdb_id: String
    known_for_department: String
    name: String
    place_of_birth: String
    popularity: Float
    profile_path: String
  }
  
  type Movie {
    adult: Boolean
    backdrop_path: String
    budget: Int
    genres: [Genre]
    homepage: String
    id: Int
    imdb_id: String
    origin_country: [String]
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    production_companies: [Production_companies]
    production_countries: [Production_countries]
    release_date: String
    revenue: Int
    runtime: Int
    spoken_languages: [Spoken_languages]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    casts: [Actor]
  }

  type SearchMoviesFromData  {
    total_pages: Int
    total_results: Int
    per_page: Int
    page: Int
    prev: Int
    next: Int
    results: [Movie]
  }

  type Genre {
    id: Int
    name: String
  }

  type Production_companies { 
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }

  type Spoken_languages {
    english_name: String
    iso_639_1: String
    name: String
  }

  type Production_countries {
    iso_3166_1: String
    name: String
  }

  input filterMovies {
    genre: String
    title: String
    year: String
  }

  type Error {
    errors: String
  }

  union MoviePayload = Movie | Error
  union SearchMoviePayload = SearchMovies | Error
  union SearchMovieFromDataPayload = SearchMoviesFromData | Error
  union SearchCastsPayload = Cast | Error
  union PersonPayload = Person | Error


  type Query {
    movies(filter: filterMovies): [Movie]
    movie(id: Int!): MoviePayload
    searchMovieFromData(filter: filterMovies, page: Int, perPage: Int): SearchMovieFromDataPayload
    searchMovieFromApi(filter: filterMovies!, page:Int!): SearchMoviePayload
    getCast(id: Int!): SearchCastsPayload
    getPerson(id: Int!): PersonPayload
  }

  type  Mutation {
   saveMovies(id: Int!): String
  }
  
`;

export default typeDefs;
