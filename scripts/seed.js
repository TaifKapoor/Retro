// scripts/seed.js

// ← YE 2 LINES SABSE UPAR ADD KARO
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Baki code
import { connectDB } from '../lib/db.js';
import Product from '../models/Product.js';
import { products } from '../data/seedData.js';
import mongoose from 'mongoose';

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optional: Manual load (agar auto nahi chala)
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seed() {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI); // ← DEBUG LINE

    await connectDB();
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared old products');

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    console.log('Seeding complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();