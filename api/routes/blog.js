import express from "express";
import { verifyTokenAndAdmin } from "./verifyToken.js";
import { Multer, uploadImages } from "../utils/uploadImage.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getByBlogCategory,
  getByBlogName,
  updateBlog,
} from "../controllers/blog.js";

const router = express.Router();
//CREATE
router.post("/", verifyTokenAndAdmin, Multer.single('image'), uploadImages, createBlog);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, Multer.single('image'), uploadImages, updateBlog);
//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteBlog);
//GET

router.get("/:id", getBlog);
//GET ALL

router.get("/", getBlogs);
router.get("/getByBlogName", getByBlogName);
router.get("/getByCategory", getByBlogCategory);

export default router;
