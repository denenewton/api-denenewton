import mongoose, { models } from "mongoose";

const productionCompaniesSchema = new mongoose.Schema({
    id: Number,
    logo_path: String,
    name: String,
    origin_country: String,
})
export default productionCompaniesSchema;


