import mongoose from "mongoose";

const cartModel = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartModel)

export default Cart