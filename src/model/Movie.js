import mongoose, { models } from "mongoose";
import { castMemberSchema } from "./Castmember";
import { genreSchema } from "./Genre";
import productionCompaniesSchema from "./Production_companies.js";
import productionCountriesSchema from "./Production_countries.js";
import spokenLanguagesSchema from "./Spoken_languages.js"

const Schema = new mongoose.Schema({
  id: Number,
  adult: Boolean,
  backdrop_path: {
    type: String,
    trim: true,
  },
  budget: Number,
  genres: {
    type: [genreSchema],
  },
  homepage: String,
  id: {
    type: Number,
    required: [true, "The id of this movie is missing"],
  },
  imdb_id: String,
  origin_country: [String],
  original_language: String,
  original_title: String,
  overview: {
    type: String,
    trim: true,
    required: [true, "Please enter the movie description"],
  },
  popularity: {
    type: Number,
  },
  poster_path: String,
  production_companies: [productionCompaniesSchema],
  production_countries: [productionCountriesSchema],
  release_date: {
    type: String,
    trim: true,
    required: [true, "Please enter the movie release date"],
  },
  revenue: Number,
  runtime: Number,
  spoken_languages: [spokenLanguagesSchema],
  status: String,
  tagline: String,
  title: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    required: [true, "Please enter the movie title"],
  },
  video: Boolean,
  vote_average: {
    type: Number,
  },
  vote_count:Number,

  url_image: {
    type: String,
    trim: true,
  },

  url_movie: {
    type: String,
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Movie = models.Movie || mongoose.model("Movie", Schema);
export default Movie;
