import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
  },
  propertyType: {
    type: String, 
  },
  size: {
    type: String, 
  },
  location: {
    type: String,
  },
  car: {
    type: Number
  },
  bath: {
    type: Number,
  },
  bed: {
    type: Number,
  },
  features: {
    type: Array,
  },
  payment: {
    type: String,
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    }
  ],
  totalrating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema)

export default Product