import Blog from "../models/BlogModel.js";
import { cloudinaryDeleteImg } from "../config/cloudinary.js";
import slugify from "slugify";
import { generateRandomNumber } from "../utils/helpers.js";

export const createBlog = async (req, res, next) => {
  const newBlog = new Blog({
    ...req.body,
    slug: slugify(req.body.title.toLowerCase()),
    blogId: generateRandomNumber(),
    author: req.user.id,
    image: req.image,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          ...(req.image && { image: req.image }),
          ...(req.body.title && { slug:  slugify(req.body.title.toLowerCase()) }),
        },
      },
      { new: true }
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    const publicId = blog.image.split("/").pop().split(".")[0];
    await cloudinaryDeleteImg(publicId);
    await res.status(200).json(`${blog.title} has been deleted.`);
  } catch (err) {
    next(err);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author"
    );
    console.log(blog);
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

export const getBlogs = async (req, res, next) => {
  const { query } = req.query;
  try {
    let blogs;
    if (query) {
      blogs = await Blog.find({
        title: { $regex: query, $options: "i" },
      });
    } else {
      blogs = await Blog.find().populate("author");
    }
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

export const getByBlogName = async (req, res, next) => {
  const blogName = req.query.header.split(",");

  try {
    const list = await Promise.all(
      blogName.map((header) => {
        return Blog.countDocuments({ header: header });
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const getByBlogCategory = async (req, res, next) => {
  try {
    const tourismCount = await Blog.countDocuments({
      category: "tourism",
    });
    const politicsCount = await Blog.countDocuments({ category: "politics" });
    const lifestyleCount = await Blog.countDocuments({ category: "lifestyle" });
    const sportsCount = await Blog.countDocuments({ category: "sports" });

    res.status(200).json([
      { category: "tourism", count: tourismCount },
      { category: "politics", count: politicsCount },
      { category: "lifestyle", count: lifestyleCount },
      { category: "sports", count: sportsCount },
    ]);
  } catch (err) {
    next(err);
  }
};
