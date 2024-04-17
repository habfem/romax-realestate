import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import estateRoute from "./routes/estate.js"
import bookingRoute from "./routes/booking.js"
import addressRoute from "./routes/address.js"
import mortgageRoute from "./routes/mortgage.js"
import timelineRoute from "./routes/timeline.js"
import FaqRoute from "./routes/FAQ.js"
import categoryRoute from "./routes/category.js"


dotenv.config();
import payRoute from "./routes/pay.js"


var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

import cors from "cors"
app.use(cors())

connectDB();

app.get("/", (req, res) => {
  res.send("Your APi is running");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/estate", estateRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", payRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/address", addressRoute);
app.use("/api/mortgage", mortgageRoute);
app.use("/api/timeline", timelineRoute);
app.use("/api/faq", FaqRoute);
app.use("/api/category", categoryRoute);



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
});