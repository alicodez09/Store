import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();

//! configure env
dotenv.config(); //This should be on top because main credentials are comming from it

//! middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//! configure database
connectDb();

// !Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgBlue.white);
});
