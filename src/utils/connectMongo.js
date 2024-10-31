import mongoose from "mongoose";

let isConnected = false;

const conn = async () => {
  try {
    if (!isConnected) {
      await mongoose.connect(process.env.URL_MONGO);
      console.log("Connected with mongoDB");
      isConnected = true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default conn;
