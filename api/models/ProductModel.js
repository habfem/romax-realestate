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
  address: {
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
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Number,
    required: true,
    default: 0
  },
  minPer: {
    type: Number,
  },
  maxPer: {
    type: Number,
  },
  isFixed: {
    type: Boolean,
    default: false,
  },
  isBounded: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema)

export default Product