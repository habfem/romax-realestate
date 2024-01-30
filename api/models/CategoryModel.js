import mongoose from "mongoose";

const categoryModel = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    bed: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    },
}, { timestamps: true })

const Category = mongoose.model("Category", categoryModel)

export default Category 