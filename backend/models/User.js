import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAdmin: {
    type: String,
    default: false,
  },
  profileImg: {
    type: String,
    default: ""
  },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User