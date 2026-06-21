import Testimonial from "../models/Testimonial.js";
import asyncHandler from "../middleware/asyncHandler.js";

// ✅ GET
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isFeatured: true }).sort({
    createdAt: -1,
  }).lean();

  res.json(testimonials);
});

// controllers/testimonialController.js

// ✅ FIXED POST CONTROLLER
export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, location, image, review, rating, status } = req.body;

  if (!name || !location || !review) {
    res.status(400);
    throw new Error("Name, location and review are required");
  }

  const testimonial = new Testimonial({
    name,
    location,
    image,
    review,
    rating,
    status: status === "inactive" ? "inactive" : "active",
  });

  const created = await testimonial.save();

  res.status(201).json(created);
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  const { name, location, image, review, rating, status } = req.body;
  if (!name || !location || !review) {
    res.status(400);
    throw new Error("Name, location and review are required");
  }

  testimonial.name = name;
  testimonial.location = location;
  if (typeof image !== "undefined") {
    testimonial.image = image;
  }
  testimonial.review = review;
  testimonial.rating = rating || testimonial.rating;
  testimonial.status = status === "inactive" ? "inactive" : "active";

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
