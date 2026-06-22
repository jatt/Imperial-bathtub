import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },

    // category: {
    //   type: String,
    //   enum: [
    //     "bathtubs",
    //     "shower-solutions",
    //     "wellness",
    //     "faucets-accessories",
    //   ],
    //   default: "bathtubs",
    // },
    category: {
      type: String,
      enum: [
        "bathtubs",
        "jacuzzi",
        "shower-solutions",
        "wellness",
        "faucets-accessories"
      ],
      default: "bathtubs"
    },

    size: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    features: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    image: {
      type: String,
      default: "",
    },

    gallery: {
      type: [String],
      default: [],
    },

    topProductRank: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;