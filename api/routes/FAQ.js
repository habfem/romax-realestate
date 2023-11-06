import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import FAQ from "../models/FAQModel.js"

const router = express.Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newFaq = new FAQ(req.body)

  try {
    const savedFaq = await newFaq.save();
    res.status(200).json(savedFaq)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/", async (req, res) => {
    try {
      const faqs = await FAQ.find()
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, Please try again" });
    }
  });

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedFaq = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedFaq);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id)
    res.status(200).json("FAQ has been deleted ....")
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get("/:id", async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router