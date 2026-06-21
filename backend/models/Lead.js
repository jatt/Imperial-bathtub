import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    interest: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;