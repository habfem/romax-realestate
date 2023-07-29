import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer"
//import verifyToken from "../middlewares/verifyToken.js";

const authController = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename)
  }
})

const upload = multer({
  storage
})


// Register
authController.post('/register', upload.single('photo'), async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email })

    if (isExisting) {
      throw new Error("Email is already taken by another user")
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = await User.create({ ...req.body, password: hashedPassword })

    const { password, ...others } = newUser._doc
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

    return res.status(201).json({ others, token })
  } catch (error) {
    return res.status(500).json(error.message)
  }
});

// Login
authController.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw new Error("wrong credentials")
    }

    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword) {
      throw new Error("wrong credentials")
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

    const { password, ...others } = user._doc

    return res.status(201).json({ others, token })
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
})

// get all

authController.get('/getAll', async (req, res) => {
  try {
    const properties = await User.find({})

    return res.status(200).json(properties)
  }
  catch (error) {
    return res.status(500).json(error.message)
  }
});


export { authController }