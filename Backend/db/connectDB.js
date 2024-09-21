import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to mongoDB", error.message);
    process.exit(1); // 1 status is failure , 0 status is succes
  }
};
