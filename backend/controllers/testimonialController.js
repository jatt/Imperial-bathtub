import Testimonial from "../models/Testimonial.js";
import asyncHandler from "../middleware/asyncHandler.js";

// ✅ GET
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isFeatured: true }).sort({
    createdAt: -1,
  });

  res.json(testimonials);
});

// controllers/testimonialController.js

// ✅ FIXED POST CONTROLLER
export const createTestimonial = asyncHandler(async (req, res) => {
  // 1. Extract ALL the fields your schema requires from the request body
  const { name, role, location, image, review, rating } = req.body;

  // 2. Pass all of those fields into your Mongoose model
  const testimonial = new Testimonial({
    name,
    role,
    location,
    image,
    review, // This was previously named "message" in your controller, causing the "review is required" error
    rating,
  });

  // 3. Save it to MongoDB
  const created = await testimonial.save();

  res.status(201).json(created);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  const { name, role, location, image, review, rating } = req.body;
  if (!name || !role || !location || !image || !review) {
    res.status(400);
    throw new Error("Name, role, location, image and review are required");
  }

  testimonial.name = name;
  testimonial.role = role;
  testimonial.location = location;
  testimonial.image = image;
  testimonial.review = review;
  testimonial.rating = rating || testimonial.rating;

  const updated = await testimonial.save();
  res.json(updated);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  await testimonial.deleteOne();
  res.json({ message: "Testimonial deleted successfully" });
});
