import express from "express";
import { verifyToken } from "./verifyToken.js";
import Address from "../models/AddressModel.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    let addressData = { ...req.body, createdBy: req.user.id };
    const newAddress = await Address.create(addressData);
    res.json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const addresses = await Address.find({ createdBy: req.user.id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const {id} = req.params
    const address = Address.findOne({
      _id: id,
      createdBy: req.user.id,
    });
    if (!address) return res.status(401).json({ message: "Address not found" });

    const  updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const {id} = req.params
    const address = Address.findOne({
      _id: id,
      createdBy: req.user.id,
    });
    if (!address) return res.status(401).json({ message: "Address not found" });

    const deletedAddress = await Address.findByIdAndDelete(id);
    res.status(200).json(deletedAddress);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

export default router;
