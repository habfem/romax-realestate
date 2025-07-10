import mongoose from "mongoose";

const blogModel = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    author: {
      type: String, 
    },
    description: {
      type: String,
    }, 
    subtitle: {
      type: String,
    },
    subtitle2: {
      type: String,
    },
    subtitle3: {
      type: String,
    },
    subtitle4: {
      type: String,
    },
    subtitle5: {
      type: String,
    },
    subdesc: {
      type: String,
    },
    subdesc2: {
      type: String,
    },
    subdesc3: {
      type: String,
    },
    subdesc4: {
      type: String,
    },
    subdesc5: {
      type: String,
    },
    listTitle: {
      type: String,
    },
    list1: {
      type: String,
    },
    list2: {
      type: String,
    },
    list3: {
      type: String,
    },
    list4: {
      type: String,
    },
    list5: {
      type: String,
    },
    slug: {
      type: String,
      unique: true
    },
    list6: {
      type: String,
    },
    image: String ,
    date: {
      type: Date, 
      default: Date.now(), 
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogModel);

export default Blog
