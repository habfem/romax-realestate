import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "./verifyToken.js";
import Booking from "../models/BookingModel.js";
// const { v4: uuidv4 } = require("uuid");
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const newBooking = await Booking.create({
      ...req.body,
      bookingId: uuidv4(),
      user: req.user.id,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/user-bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "product"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "product"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('product');
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
