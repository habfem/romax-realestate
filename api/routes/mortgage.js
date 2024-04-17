import express from "express";
import { verifyToken } from "./verifyToken.js";
import Mortgage from "../models/MortgageModel.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
    try {
      let mortgageData = { ...req.body, createdBy: req.user.id };
      const newMortgage = await Mortgage.create(mortgageData);
      res.json(newMortgage);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
      const mortgages = await Mortgage.find({ createdBy: req.user.id });
      res.status(200).json(mortgages);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    try {
      const mortgage = await Mortgage.findById(req.params.id);
      res.status(200).json(mortgage);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
      const {id} = req.params
      const mortgage = Mortgage.findOne({
        _id: id,
        createdBy: req.user.id,
      });
      if (!mortgage) return res.status(401).json({ message: "Mortgage not found" });
  
      const  updatedMortgage = await Mortgage.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      res.status(200).json(updatedMortgage);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
      const {id} = req.params
      const mortgage = Mortgage.findOne({
        _id: id,
        createdBy: req.user.id,
      });
      if (!mortgage) return res.status(401).json({ message: "Mortgage not found" });
  
      const deletedMortgage = await Mortgage.findByIdAndDelete(id);
      res.status(200).json(deletedMortgage);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
});

export default router;