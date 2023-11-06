import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
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
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    MainAdmin: {
      type: Boolean,
      default: false,
    },
    savedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = CryptoJS.lib.WordArray.random(16).toString();
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 3600000; 
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
