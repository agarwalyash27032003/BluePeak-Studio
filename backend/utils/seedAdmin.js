require("dotenv").config();
const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seed = async () => {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is required");
    process.exit(1);
  }
  if (!email || !password) {
    console.error("ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD are required");
    process.exit(1);
  }

  await connectDB();

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  await Admin.create({
    name: "BluePeak Admin",
    email,
    password,
  });

  console.log("Admin seeded:", email);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
