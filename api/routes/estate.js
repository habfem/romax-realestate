import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "./verifyToken.js";
import Estate from "../models/EstateModel.js"
import { Multer, uploadImages } from "../utils/uploadImage.js";
import { cloudinaryDeleteImg } from "../config/cloudinary.js";

const router = express.Router();

//CREATE
router.post('/',
  verifyTokenAndAdmin,
  Multer.array("images", 10),
  uploadImages,
  async (req, res) => {
    const newEstate = new Estate({ ...req.body, img: req.images });
    try {
      const savedEstate = await newEstate.save();
      res.status(200).json(savedEstate);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, Multer.array("images", 10), uploadImages, async (req, res) => {
  let parsedPreviousImages = []
  try {
    if (req.body.previousImages && req.body.previousImages.length > 0) {
      parsedPreviousImages = req.body.previousImages.map((imageString) =>
        JSON.parse(imageString)
      );
    }
    const { id } = req.params;

    let updatedData = req.body;
    const estate = await Estate.findById(id);
    const existingImages = estate.img;
    let updatedImages = [];

    if (req.images && req.images.length > 0) {
      updatedImages = req.images;
    }
    updatedData.images = [...updatedImages, ...existingImages];


    const removedImages = existingImages.filter(
      (existingImage) =>
        !parsedPreviousImages.some(
          (previousImage) => previousImage.split("/").pop().split(".")[0] === existingImage.split("/").pop().split(".")[0]
        )
    );

    for (const removedImage of removedImages) {
      const publicId = removedImage.split("/").pop().split(".")[0];
      console.log(publicId)
      await cloudinaryDeleteImg(publicId);
    }
    updatedData.img = updatedData.images.filter(
      (updatedImage) =>
        !removedImages.some(
          (removedImage) => removedImage.split("/").pop().split(".")[0] === updatedImage.split("/").pop().split(".")[0]
        )
    );

    delete updatedData.previousImages;
    const updatedEstate = await Estate.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(updatedEstate);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const estate = await Estate.findById(req.params.id);
    // console.log(estate._id)
    const imagesToDelete = estate.img;
    for (const image of imagesToDelete) {
      const publicId = image.split("/").pop().split(".")[0];
      await cloudinaryDeleteImg(publicId);
    }
    await Estate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Estate has been deleted ...." });
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