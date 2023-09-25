import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import Product from "../models/ProductModel.js";

const router = express.Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted ....");
  } catch (err) {
    res.status(500).json(err);
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

//GET ALL PRODUCT
router.get("/", async (req, res) => {
  console.log(req.query);
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
      "types",
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
      query = query.where("car").lt(maxCar);
    } else if (minCar) {
      query = query.where("car").gt(minCar);
    }

    if (maxPrice && minPrice) {
      query = query.where({ price: { $lte: maxPrice, $gte: minPrice } });
    } else if (maxPrice) {
      query = query.where("price").lt(maxPrice);
    } else if (minPrice) {
      query = query.where("price").gt(minPrice);
    }

    if (maxBed && minBed) {
      query = query.where({ bed: { $lte: maxBed, $gte: minBed } });
    } else if (maxBed) {
      query = query.where("bed").lt(maxBed);
    } else if (minBed) {
      query = query.where("bed").gt(minBed);
    }

    if (types) {
      const propertyTypes = types.split(",").map((type) => type.trim());
      query = query.where("propertyType").in(propertyTypes);
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
