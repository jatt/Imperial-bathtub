import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProductById,
  getProducts,
  updateProduct
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);
router.get("/slug/:slug", getProductBySlug);
router.get("/:id", getProductById);

export default router;
