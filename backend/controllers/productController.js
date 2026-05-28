import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

export const getProducts = asyncHandler(async (req, res) => {
  const { category, limit } = req.query;
  const filters = {};

  if (category) filters.category = category;

  let query = Product.find(filters).sort({ createdAt: -1 });
  if (limit) query = query.limit(Number(limit));

  const products = await query;
  res.json(products);
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug.toLowerCase() });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = mongoose.isValidObjectId(id)
    ? await Product.findById(id)
    : await Product.findOne({ slug: id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, size, price, description, image } = req.body;
  if (!name || !size || !price || !description || !image) {
    res.status(400);
    throw new Error("Name, Size, Price, Description and Image are required");
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const product = await Product.create({
    name,
    size,
    price,
    description,
    image,
    slug
  });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, size, price, description, image } = req.body;

  if (!name || !size || !price || !description || !image) {
    res.status(400);
    throw new Error("Name, Size, Price, Description and Image are required");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  product.name = name;
  product.size = size;
  product.price = price;
  product.description = description;
  product.image = image;
  product.slug = slug;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product deleted successfully" });
});
