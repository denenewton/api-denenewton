import mongoose, { models } from "mongoose";

const productionCountriesSchema = new mongoose.Schema({
    iso_3166_1: String,
    name: String,
})

export default productionCountriesSchema;

