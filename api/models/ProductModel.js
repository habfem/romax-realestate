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
  sataliteView: {
    type: String,
    default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.628832061897!2d7.2669306747132225!3d9.006258891054172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7195d1abacc9%3A0xc905ee88d56fa2ff!2sNnamdi%20Azikiwe%20International%20Airport!5e0!3m2!1sen!2sng!4v1707140705524!5m2!1sen!2sng",
  },
  streetView:{
    type: String,
    default: "https://www.google.com/maps/embed?pb=!3m2!1sen!2sng!4v1707140494131!5m2!1sen!2sng!6m8!1m7!1s5QPqTESWceMIwAMjkXcr_g!2m2!1d9.00629720178299!2d7.270159733240058!3f175.6531677246094!4f-1.6252365112304688!5f0.7820865974627469",
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
  broadband: {
    type: String,
    default: "Fibre-To-The-Home (FTTH)"
  },
  parlourDesc: {
    type: String,
    default: "Lorem"
  },
  parlourDimension: {
    type: String,
    default: "20m by 20m"
  },
  kitchenDesc: {
    type: String,
    default: "Lorem kitchen"
  },
  kitchenDimension: {
    type: String,
    default: "20m by 20m"
  },
  energyEfficiency: {
    type: String,
    default: "C+"
  },
  rooms: [
    {
      title: { type: String, default: "Room" },
      description: { type: String, default: "Room Description" },
      dimensions: { type: String, default: "20m by 20m" },
    },
  ],
  otherSpace: [
    {
      title: { type: String, default: "Other Space" },
      description: { type: String, default: "Other Space Description" },
      dimensions: { type: String, default: "20m by 20m" },
    },
  ],
  OutsideSpace: [
    {
      title: { type: String, default: "Outside Space" },
      description: { type: String, default: "Outside Space Description" },
      dimensions: { type: String, default: "20m by 20m" },
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema)

export default Product