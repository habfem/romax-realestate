import express from "express"
import User from "../models/UserModel.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

const router = express.Router() 

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    

  });
   
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
  catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    //!user && res.status(401).json("Wrong credentials!")
    if (!user) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalpassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin,
    },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  }
  catch (error) {
    res.status(500).json(error)
  }
})

export default router