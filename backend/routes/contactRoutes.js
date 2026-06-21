import express from "express";
import { createContact, getContacts, updateContactStatus, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContactStatus).delete(deleteContact);

export default router;