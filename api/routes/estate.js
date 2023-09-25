import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import Estate from "../models/EstateModel.js"

const router = express.Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newEstate = new Estate(req.body)

  try {
    const savedEstate = await newEstate.save();
    res.status(200).json(savedEstate)
  } catch (err) {
    res.status(500).json(err)
  }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateEstate = await Estate.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateEstate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Estate.findByIdAndDelete(req.params.id)
    res.status(200).json("Estate has been deleted ....")
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET ESTATE
router.get("/find/:id", async (req, res) => {
  try {
    const estate = await Estate.findById(req.params.id);
    res.status(200).json(estate);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ESTATE
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let estates;

    if (qNew) {
      estates = await Estate.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
      estates = await Estate.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      estates = await Estate.find();
    }

    res.status(200).json(estates);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router