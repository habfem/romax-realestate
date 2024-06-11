import express from "express";
import User from "../models/UserModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { sendTokenEmail } from "../utils/emailService.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ $or:[{ email: req.body.email }, { username: req.body.username }] });
    //!user && res.status(401).json("Wrong credentials!")
    if (!user) {
      res.status(401).json("Wrong Credentials!");
      return;
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalpassword !== req.body.password)
      return res.status(401).json("Wrong credentials!");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
      // { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = await user.createPasswordResetToken();
    const resetLink = `${process.env.FRONTEND_URL}reset?token=${resetToken}`;
    await user.save();
    await sendTokenEmail(resetLink, user);
    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending password reset link" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user)
      return res
        .status(500)
        .json({ message: "Token Expired Or Invalid Token, Please try again" });

    user.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});

export default router;
