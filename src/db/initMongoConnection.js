// gGHdgYdW9VqQPk5P

//mongodb+srv://jasen:<db_password>@cluster0.qilf5.mongodb.net/my-contacts?retryWrites=true&w=majority&appName=Cluster0

import mongoose from 'mongoose';

import {env} from '../utils/env.js';

export const initMongoDB = async () => {
  try {
    const user = env('MONGODB_USER');
    const password = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');
    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('Mongo connection successfully established!');
  }
  catch (error) {
    console.log(`Error connect database with message ${error.message}`);
    throw error;
  }
}