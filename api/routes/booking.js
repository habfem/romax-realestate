import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "./verifyToken.js";
import Booking from "../models/BookingModel.js";
import User from "../models/UserModel.js"
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      bookingId: uuidv4(),
    });
    res.status(201).json(newBooking);
  } catch (error) {
     console.log(error)
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/user-bookings", verifyToken, async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id)
    const bookings = await Booking.find({ email: user.email }).populate(
      "product.item"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/products", verifyTokenAndAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find({"product.type": "Product"}).populate(
      "product.item"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/estates", verifyTokenAndAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find({"product.type": "Estate"}).populate(
      "product.item"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('product.item');
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

export default router;
