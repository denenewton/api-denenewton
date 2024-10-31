import mongoose, { models } from "mongoose";

 const spokenLanguagesSchema = new mongoose.Schema({
    english_name: String,
    iso_639_1: String,
    name: String,
})

export default spokenLanguagesSchema;