import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [255, "Email cannot exceed 255 characters"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    product: {
      type: String,
      required: [true, "Product is required"],
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    quantity: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "quoted", "accepted", "rejected", "archived"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema)
