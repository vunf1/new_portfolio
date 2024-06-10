import mongoose from 'mongoose';
import { error, info } from './logger';
import { dbUri } from './middleware/auth';

const connectDB = async () => {
    console.info(dbUri);
  try {
    await mongoose.connect(dbUri ?? "mongodb+srv://vunf1:Yd0cRfXZgKmWaVEX@webfolio.m1easpr.mongodb.net/?retryWrites=true&w=majority&appName=webfolio");

  } catch (err) {
    if (err instanceof Error) {
      error(err.message);
      process.exit(1);
    } else {
      error('An unknown error occurred');
      process.exit(1);
    }
  }
};

export default connectDB;
