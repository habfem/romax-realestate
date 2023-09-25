import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import Timeline from "../models/Timline.js";

const router = express.Router();

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newTimeline = new Timeline(req.body)

  try {
    const savedTimeline = await newTimeline.save();
    res.status(200).json(savedTimeline)
  } catch (err) {
    res.status(500).json(err)
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedTimeline = await Timeline.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTimeline);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id)
    res.status(200).json("Timeline has been deleted ....")
  } catch (err) {
    res.status(500).json(err)
  }
});

//GET TIMELINE
router.get("/find/:id", async (req, res) => {
  try {
    const timeline = await Timeline.findById(req.params.id);
    res.status(200).json(timeline);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL TIMELINE
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let timelines;

    if (qNew) {
      timelines = await Timeline.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
      timelines = await Timeline.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      timelines = await Timeline.find();
    }

    res.status(200).json(timelines);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router