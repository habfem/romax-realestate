import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import { Multer, uploadImages } from "../utils/uploadImage.js";
import { cloudinaryDeleteImg } from "../config/cloudinary.js";
import Product from "../models/ProductModel.js";
const router = express.Router();

//CREATE
router.post(
  "/",
  verifyTokenAndAdmin,
  Multer.array("images", 10),
  uploadImages,
  async (req, res) => {
    const newProduct = new Product({ ...req.body, img: req.images });

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//UPDATE
router.put(
  "/:id",
  verifyTokenAndAdmin,
  Multer.array("images", 10),
  uploadImages,
  async (req, res) => {
    let parsedPreviousImages = [];
    try {
      if (req.body.previousImages && req.body.previousImages.length > 0) {
        parsedPreviousImages = req.body.previousImages.map((imageString) =>
          JSON.parse(imageString)
        );
      }

      const { id } = req.params;

      let updatedData = req.body;
      const product = await Product.findById(id);
      const existingImages = product.img;
      let updatedImages = [];

      if (req.images && req.images.length > 0) {
        updatedImages = req.images;
      }

      updatedData.images = [...updatedImages, ...existingImages];

      const removedImages = existingImages.filter(
        (existingImage) =>
          !parsedPreviousImages.some(
            (previousImage) =>
              previousImage.split("/").pop().split(".")[0] ===
              existingImage.split("/").pop().split(".")[0]
          )
      );

      for (const removedImage of removedImages) {
        const publicId = removedImage.split("/").pop().split(".")[0];
        console.log(publicId);
        await cloudinaryDeleteImg(publicId);
      }

      updatedData.img = updatedData.images.filter(
        (updatedImage) =>
          !removedImages.some(
            (removedImage) =>
              removedImage.split("/").pop().split(".")[0] ===
              updatedImage.split("/").pop().split(".")[0]
          )
      );

      delete updatedData.previousImages;
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      res.json(updatedProduct);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // console.log(product._id)
    const imagesToDelete = product.img;
    for (const image of imagesToDelete) {
      const publicId = image.split("/").pop().split(".")[0];
      await cloudinaryDeleteImg(publicId);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted ...." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL PRODUCT TYPES
router.get("/get-property-type", async (req, res) => {
  try {
    const propertyTypes = await Product.distinct("propertyType", {
      location: { $exists: true } 
    }).collation({ locale: 'en', strength: 2 });
    res.json(propertyTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL PRODUCT LOCATIONS
router.get("/get-locations", async (req, res) => {
  try {
    const locations = await Product.distinct("location", {
      location: { $exists: true } 
    }).collation({ locale: 'en', strength: 2 });
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/increment-views/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      productId,
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true } // Return the updated document
    );
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//GET ALL PRODUCT
router.get("/", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = [
      "sort",
      "minPrice",
      "maxPrice",
      "minBed",
      "maxBed",
      "minCar",
      "maxCar",
      // "types",
      "location",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    // Filter by maxPrice and/or minPrice
    const maxPrice = req.query.maxPrice;
    const minPrice = req.query.minPrice;
    const maxBed = req.query.maxBed;
    const minBed = req.query.minBed;
    const maxCar = req.query.maxCar;
    const minCar = req.query.minCar;
    const types = req.query.types;

    if (maxCar && minCar) {
      query = query.where({ car: { $lte: maxCar, $gte: minCar } });
    } else if (maxCar) {
      query = query.where("car").lte(maxCar);
    } else if (minCar) {
      query = query.where("car").gte(minCar);
    }

    if (maxPrice && minPrice) {
      query = query.where({ price: { $lte: maxPrice, $gte: minPrice } });
    } else if (maxPrice) {
      query = query.where("price").lte(maxPrice);
    } else if (minPrice) {
      query = query.where("price").gte(minPrice);
    }

    if (maxBed && minBed) {
      query = query.where({ bed: { $lte: maxBed, $gte: minBed } });
    } else if (maxBed) {
      query = query.where("bed").lte(maxBed);
    } else if (minBed) {
      query = query.where("bed").gte(minBed);
    }

    // if (types) {
    //   const propertyTypes = types.split(",").map((type) => type.trim());
    //   query = query.where("propertyType").in(propertyTypes);
    // }
    if (req.query.location) {
      const location = req.query.location;
      query = query.where({ location: { $regex: location, $options: "i" } });
    }
    // Filter by sort
    if (req.query.sort) {
      const { sort } = req.query;
      let sortBy = "-createdAt";
      if (sort === "newest") {
        sortBy = "-createdAt";
      } else if (sort === "oldest") {
        sortBy = "createdAt";
      } else if (sort === "highest") {
        sortBy = "-price";
      } else if (sort === "lowest") {
        sortBy = "price";
      }
      query = query.sort(sortBy);
    }
    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
