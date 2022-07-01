import mongoose, { Mongoose } from "mongoose";

type connectFN = () => void;

const connectDB: connectFN = async () => {
  try {
    const conn: Mongoose = await mongoose.connect(`${process.env.MONGO_URI}`);
    mongoose.syncIndexes();
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error: any) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
