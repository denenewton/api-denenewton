import mongoose from "mongoose";

export const castMemberSchema = new mongoose.Schema({
  adult: {
    type: Boolean,
    required: false,
  },
  gender: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: [true, "The id of this character is missing"],
  },
  known_for_department: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: [true, "Please enter the name"],
  },
  original_name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: [true, "Please enter the original name"],
  },
  profile_path: {
    type: String,
    trim: true,
  },
  character: {
    type: String,
    trim: true,
    required: [true, "Please enter the character name"],
  },
  credit_id: {
    type: String,
    trim: true,
  },
  popularity: Number,
  cast_id: Number,
  order: Number,
});
