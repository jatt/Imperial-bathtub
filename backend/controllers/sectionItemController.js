import asyncHandler from "../middleware/asyncHandler.js";
import SectionItem from "../models/SectionItem.js";

const requiredBySection = {
  projects: ["title", "category", "image"],
  "buying-guide": ["title", "text"],
  about: ["title", "text"],
  team: ["name", "role", "image"]
};

const validatePayload = (section, payload) => {
  const requiredFields = requiredBySection[section];
  if (!requiredFields) {
    return "Invalid section";
  }

  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    return `${missingField} is required for ${section}`;
  }

  return null;
};

export const getSectionItems = asyncHandler(async (req, res) => {
  const { section, limit, page, fields } = req.query;
  const filters = {};

  if (section) {
    filters.section = section;
  }

  const currentPage = Math.max(Number(page) || 1, 1);
  const perPage = Math.min(Number(limit) || 50, 100);
  const skip = (currentPage - 1) * perPage;

  let query = SectionItem.find(filters).sort({ createdAt: -1 }).skip(skip).limit(perPage);

  if (fields) {
    query = query.select(fields.split(",").map((field) => field.trim()).join(" "));
  }

  query = query.lean();
  const [items, total] = await Promise.all([query, SectionItem.countDocuments(filters)]);

  res.setHeader("X-Total-Count", String(total));
  res.setHeader("X-Page", String(currentPage));
  res.setHeader("X-Per-Page", String(perPage));

  res.json(items);
});

export const createSectionItem = asyncHandler(async (req, res) => {
  const { section } = req.body;
  const validationError = validatePayload(section, req.body);

  if (validationError) {
    res.status(400);
    throw new Error(validationError);
  }

  const item = await SectionItem.create(req.body);
  res.status(201).json(item);
});

export const updateSectionItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { section } = req.body;

  const item = await SectionItem.findById(id);
  if (!item) {
    res.status(404);
    throw new Error("Section item not found");
  }

  const nextSection = section || item.section;
  const mergedPayload = { ...item.toObject(), ...req.body, section: nextSection };
  const validationError = validatePayload(nextSection, mergedPayload);

  if (validationError) {
    res.status(400);
    throw new Error(validationError);
  }

  Object.assign(item, req.body, { section: nextSection });
  const updated = await item.save();

  res.json(updated);
});

export const deleteSectionItem = asyncHandler(async (req, res) => {
  const item = await SectionItem.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error("Section item not found");
  }

  await item.deleteOne();
  res.json({ message: "Section item deleted successfully" });
});
