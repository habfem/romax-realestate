import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db/db.js";
import { authController } from "./controllers/authControllers.js";
import { propertyController } from "./controllers/propertyController.js";
import uploadController from "./controllers/uploadController.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

//routes & middlewares
app.get("/", (req, res) => {
  res.send("Your API is running")
})

app.use("/images", express.static("public/images"))


app.use("/auth", authController)
app.use("/property", propertyController)
app.use("/upload", uploadController)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})