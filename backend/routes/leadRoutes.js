import express from "express";
import { createLead, getLeads, updateLeadStatus, deleteLead } from "../controllers/leadController.js";

const router = express.Router();

router.route("/").get(getLeads).post(createLead);
router.route("/:id").put(updateLeadStatus).delete(deleteLead);

export default router;


