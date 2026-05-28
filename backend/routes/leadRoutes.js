import express from "express";
import { createLead, getLeads } from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getLeads).post(createLead);

export default router;


