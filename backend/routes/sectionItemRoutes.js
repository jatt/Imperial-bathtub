import express from "express";
import {
  createSectionItem,
  deleteSectionItem,
  getSectionItems,
  updateSectionItem
} from "../controllers/sectionItemController.js";

const router = express.Router();

router.route("/").get(getSectionItems).post(createSectionItem);
router.route("/:id").put(updateSectionItem).delete(deleteSectionItem);

export default router;
