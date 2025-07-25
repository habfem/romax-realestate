import express from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import User from "../models/UserModel.js";

const router = express.Router();

//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  console.log(req.body);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted ....");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/save-property/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if property is already saved
    const propertyIndex = user.savedProperties.findIndex(savedP => 
      savedP.toString() === id
    );

    let message;
    if (propertyIndex !== -1) {
      // Property exists - remove it
      user.savedProperties.pull(id);
      message = "Property has been unsaved from your wishlist";
    } else {
      // Property doesn't exist - add it
      user.savedProperties.push(id);
      message = "Property has been saved to your wishlist";
    }

    await user.save();
    
    return res.json({
      message,
      savedProperties: user.savedProperties,
      isSaved: propertyIndex === -1
    });

  } catch (err) {
    console.error("Error in save-property:", err);
    res.status(500).json({ 
      message: "Failed to update saved properties",
      error: err.message 
    });
  }
});

router.get("/user-saved-properties", verifyToken, async (req, res) => {
  try {
    const properties = await User.findById(req.user.id).populate(
      "savedProperties"
    );
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, Please try again" });
  }
});
export default router;
