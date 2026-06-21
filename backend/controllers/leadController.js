import Lead from "../models/Lead.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  res.json(leads);
});

export const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, interest, message, source } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }

  const lead = await Lead.create({
    name,
    email,
    phone,
    interest,
    message,
    source
  });

  res.status(201).json({
    message: "Lead created successfully",
    lead
  });
});

export const updateLeadStatus = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  const { status } = req.body;
  if (status) {
    lead.status = status;
  }

  await lead.save();
  res.json(lead);
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    res.status(404);
    throw new Error("Lead not found");
  }

  await lead.deleteOne();
  res.json({ message: "Lead deleted successfully" });
});