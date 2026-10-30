import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dummy';
const options = {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 10000,
};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  console.warn('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (process.env.MONGODB_URI) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    } else {
      globalWithMongo._mongoClientPromise = Promise.resolve(null as any);
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  if (process.env.MONGODB_URI) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.resolve(null as any);
  }
}

export default clientPromise;
