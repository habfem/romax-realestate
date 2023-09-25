import mongoose from "mongoose";

const bookingModel = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    bookDate: { type: Date, default: Date.now() },
    viewDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingModel);

export default Booking;
