const mongoose = require("mongoose");

/**
 * Connect to MongoDB. Prefer MONGO_URL from .env.
 * Use a standard mongodb:// URI (not mongodb+srv://) if you see querySrv ECONNREFUSED on Windows.
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error("MONGO_URL is not set in .env");
  }

  const options = {
    serverSelectionTimeoutMS: 15000,
    family: 4,
  };

  await mongoose.connect(uri, options);
  console.log("MongoDB Connected");
};

module.exports = connectDB;
