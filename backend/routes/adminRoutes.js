import express from "express";
import { getDashboardSummary } from "../controllers/adminController.js";

const router = express.Router();

router.get("/dashboard", getDashboardSummary);

export default router;
