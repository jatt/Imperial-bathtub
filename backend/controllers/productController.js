import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

export const getProducts = asyncHandler(async (req, res) => {
  const { category, limit, fields } = req.query;
  const filters = {};

  if (category) filters.category = category;

  const page = Math.max(Number(req.query.page) || 1, 1);
  const perPage = Math.min(Number(limit) || 12, 100);
  const skip = (page - 1) * perPage;

  let query = Product.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);

  if (!fields) {
    query = query.select(
      "name slug image category size price shortDescription status"
    );
  } else {
    query = query.select(
      fields
        .split(",")
        .map((field) => field.trim())
        .join(" ")
    );
  }

  query = query.lean();

  const [products, total] = await Promise.all([
    query,
    Product.countDocuments(filters),
  ]);

  res.setHeader("X-Total-Count", String(total));
  res.setHeader("X-Page", String(page));
  res.setHeader("X-Per-Page", String(perPage));

  res.json(products);
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const { related, relatedLimit = 3 } = req.query;
  const slug = req.params.slug.toLowerCase();

  const product = await Product.findOne({ slug }).lean();

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (related === "true") {
    const relatedProducts = await Product.find({
      slug: { $ne: slug },
      status: "active",
    })
      .limit(Number(relatedLimit))
      .select(
        "name slug image category size price shortDescription status"
      )
      .lean();

    return res.json({ product, relatedProducts });
  }

  res.json(product);
});

export const getProductById = asyncHandler(async (req, res) => {
  const { related, relatedLimit = 3 } = req.query;
  const { id } = req.params;

  const product = mongoose.isValidObjectId(id)
    ? await Product.findById(id).lean()
    : await Product.findOne({ slug: id }).lean();

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (related === "true") {
    const relatedProducts = await Product.find({
      slug: { $ne: product.slug },
      status: "active",
    })
      .limit(Number(relatedLimit))
      .select(
        "name slug image category size price shortDescription status"
      )
      .lean();

    return res.json({ product, relatedProducts });
  }

  res.json(product);
});

const parseFeatures = (value) => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return String(value)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
};

// export const createProduct = asyncHandler(async (req, res) => {
//   const {
//     name,
//     category,
//     size,
//     price,
//     shortDescription,
//     description,
//     features,
//     status,
//     image,
//   } = req.body;

//   // IMAGE REMOVED FROM REQUIRED VALIDATION
//   if (!name || !category || !size || !price || !description) {
//     res.status(400);
//     throw new Error(
//       "Name, Category, Size, Price and Description are required"
//     );
//   }

//   const slug = name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");

//   const product = await Product.create({
//     name,
//     category,
//     size,
//     price,
//     shortDescription,
//     description,
//     features: parseFeatures(features),
//     status: status === "inactive" ? "inactive" : "active",
//     image: image || "",
//     slug,
//   });

//   res.status(201).json(product);
// });

export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    size,
    price,
    shortDescription,
    description,
    features,
    status,
    image,
  } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Name and Description are required");
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  const product = await Product.create({
    name,
    slug,
    category: category || "bathtubs",
    size: size || "",
    price: price || "",
    shortDescription: shortDescription || "",
    description,
    features: features
      ? String(features)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
    status: status === "inactive" ? "inactive" : "active",
    image: image || "",
  });

  res.status(201).json(product);
});
// export const updateProduct = asyncHandler(async (req, res) => {

//   const { id } = req.params;

//   const {
//     name,
//     category,
//     size,
//     price,
//     shortDescription,
//     description,
//     features,
//     status,
//     image,
//   } = req.body;

//   // IMAGE REMOVED FROM REQUIRED VALIDATION
//   if (!name || !category || !size || !price || !description) {
//     res.status(400);
//     throw new Error(
//       "Name, Category, Size, Price and Description are required"
//     );
//   }

//   const product = await Product.findById(id);

//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   const slug = name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");

//   product.name = name;
//   product.category = category;
//   product.size = size;
//   product.price = price;
//   product.shortDescription = shortDescription;
//   product.description = description;
//   product.features = parseFeatures(features);
//   product.status = status === "inactive" ? "inactive" : "active";
//   product.slug = slug;

//   // UPDATE IMAGE ONLY IF NEW IMAGE IS PROVIDED
//   if (image) {
//     product.image = image;
//   }

//   const updatedProduct = await product.save();

//   res.json(updatedProduct);
// });
// export const updateProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     res.status(404);
//     throw new Error("Product not found");
//   }

//   const {
//     name,
//     category,
//     size,
//     price,
//     shortDescription,
//     description,
//     features,
//     status,
//     image,
//   } = req.body;

//   if (!name || !description) {
//     res.status(400);
//     throw new Error("Name and Description are required");
//   }

//   const slug = name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-");

//   product.name = name;
//   product.slug = slug;
//   product.category = category || "bathtubs";
//   product.size = size || "";
//   product.price = price || "";
//   product.shortDescription = shortDescription || "";
//   product.description = description;

//   product.features = features
//     ? String(features)
//         .split(",")
//         .map((item) => item.trim())
//         .filter(Boolean)
//     : [];

//   product.status = status === "inactive" ? "inactive" : "active";

//   if (image !== undefined) {
//     product.image = image || "";
//   }

//   const updatedProduct = await product.save();

//   res.json(updatedProduct);
// });

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    size,
    price,
    shortDescription,
    description,
    features,
    status,
    image,
  } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update only provided fields

  if (name !== undefined && name !== "") {
    product.name = name;

    product.slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  if (category !== undefined && category !== "") {
    product.category = category;
  }

  if (size !== undefined) {
    product.size = size;
  }

  if (price !== undefined) {
    product.price = price;
  }

  if (shortDescription !== undefined) {
    product.shortDescription = shortDescription;
  }

  if (description !== undefined && description !== "") {
    product.description = description;
  }

  if (features !== undefined) {
    product.features = parseFeatures(features);
  }

  if (status !== undefined) {
    product.status =
      status === "inactive" ? "inactive" : "active";
  }

  // Image completely optional
  if (image !== undefined && image !== "") {
    product.image = image;
  }

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

  res.json({
    message: "Product deleted successfully",
  });
});