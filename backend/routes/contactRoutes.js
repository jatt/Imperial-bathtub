import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContacts).post(createContact);

export default router;