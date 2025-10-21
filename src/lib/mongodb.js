import { MongoClient } from "mongodb";

// Load MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const options = { 
  appName: "ApartmentFinder",
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close connections after 45 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
};

let client = new MongoClient(uri, options);

export default client;
