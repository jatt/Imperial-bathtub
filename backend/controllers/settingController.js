import asyncHandler from "../middleware/asyncHandler.js";
import Setting from "../models/Setting.js";

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.findOne().lean();
  res.json(settings || {});
});

export const updateSettings = asyncHandler(async (req, res) => {
  const payload = {
    companyName: req.body.companyName,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    whatsappNumber: req.body.whatsappNumber,
    instagram: req.body.instagram,
    facebook: req.body.facebook,
    footerText: req.body.footerText,
    logo: req.body.logo,
  };

  let settings = await Setting.findOne().lean();
  if (settings) {
    Object.assign(settings, payload);
    settings = await settings.save();
  } else {
    settings = await Setting.create(payload);
  }

  res.json(settings);
});
