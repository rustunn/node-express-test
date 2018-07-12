import { MongoClient } from 'mongodb';
import logger from './logger.js';

let db;

export async function connectDB() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db(process.envMONGODB_NAME);
  } catch (err) {
    logger.error('MongoDB connection error. Please make sure MongoDB is running.',  err);
    process.exit();
  }
}

export function getDB() {
  return db;
}
