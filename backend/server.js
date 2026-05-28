import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import sectionItemRoutes from "./routes/sectionItemRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"; // ✅ uncomment

dotenv.config();

// ✅ FIRST create app
const app = express();


// ✅ ENV VARIABLES
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "*";

// ✅ MIDDLEWARES
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(express.json());

// ✅ LOGGER
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// console.log("Mongo URI:", process.env.MONGO_URI);

// ✅ ROUTES
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MERN API is running 🚀",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/section-items", sectionItemRoutes);

// ✅ ERROR HANDLING (LAST)
app.use(notFound);
app.use(errorHandler);

// ✅ START SERVER
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

startServer();
