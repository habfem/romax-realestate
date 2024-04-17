import mongoose from "mongoose";
var addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;