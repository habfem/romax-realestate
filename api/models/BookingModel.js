import mongoose from "mongoose";

const bookingModel = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    product: {
      type: {
        type: String,
        enum: ["Estate", "Product"], 
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "product.type", 
        required: true,
      },
    },
    // product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    bookDate: { type: Date, default: Date.now() },
    viewDate: { type: Date },
    phone: { type: String},
    email: { type: String},
    message: { type: String},

  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingModel);

export default Booking;
