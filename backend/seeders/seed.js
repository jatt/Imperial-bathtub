import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Contact from "../models/Contact.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Testimonial from "../models/Testimonial.js";
import products from "../data/products.js";
import testimonials from "../data/testimonials.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();
    await Testimonial.deleteMany();
    await Contact.deleteMany();

    await Product.insertMany(products);
    await User.create({
      name: "Admin User",
      email: "imperial@gmail.com",
      password: "Imperial$Beast",
      role: "admin"
    });
    await Testimonial.insertMany(testimonials);

    console.log("Sample data inserted");
    console.log("Sample products and testimonials inserted");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
