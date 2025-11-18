// scripts/seedCategories.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Category from "../models/Category.js";
import { categoryCards } from "../data/categories.js";
import { fileURLToPath } from "url";
import path from "path";

// ---- FIX: FORCE LOAD ABSOLUTE PATH ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env.local"), // <-- IMPORTANT FIX
});

console.log("🔍 Loaded MONGODB_URI:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI still missing!");
  process.exit(1);
}

const seed = async () => {
  try {
    await connectDB();
    console.log("✔ Database connected");

    await Category.deleteMany();
    console.log("🗑 Old categories deleted");

    const formatted = categoryCards.map(c => ({
      name: c.name,
      slug: c.slug,
      image: c.image,
      count: c.count
    }));

    await Category.insertMany(formatted);

    console.log(`🎉 Inserted ${formatted.length} categories.`);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DB disconnected");
    process.exit();
  }
};

seed();
