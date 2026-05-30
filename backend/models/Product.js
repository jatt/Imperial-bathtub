import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, sparse: true },
    size: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    category: { type: String, default: "jacuzzi" }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
