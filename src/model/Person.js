import mongoose, { models } from "mongoose";

const Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  id_movie: [
    {
      type: mongoose.Schema.Types.Number,
      ref: "Movie",
      required: true,
    },
  ],

  adult: {
    type: Boolean,
    required: false,
  },
  gender: {
    type: Number,
    required: false,
  },
  also_known_as: {
    type: [String],
    required: false,
  },

  biography: {
    type: String,
    required: false,
  },

  place_of_birth: {
    type: String,
    required: false,
  },
  imdb_id: {
    type: String,
    required: false,
  },
  birthday: {
    type: String,
    required: false,
  },
  url_movie: {
    type: [String],
    required: true,
  },

  deathday: {
    type: String,
    required: false,
  },

  homepage: {
    type: String,
    required: false,
  },

  known_for_department: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    //unique:true,
    required: true,
  },
  popularity: {
    type: Number,
    required: false,
  },
  profile_path: {
    type: String,
    required: false,
  },
});

const Person = models.Person || mongoose.model("Person", Schema);
export default Person;
