import express from "express";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  updateProductController,
  getAllProductController,
  getSingleProductController,
  getPhotoController,
  deleteProductController,
} from "../controllers/productController.js";

// Router Object
const router = express.Router();

//Create Product || POST METHOD
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(), //This is for image upload it will post any type of data basically
  createProductController
);

//Update Product || POST METHOD
router.put(
  "/update-product",
  // requireSignIn,
  // isAdmin,
  formidable(), //This is for image upload it will post any type of data basically
  updateProductController
);

// Get All Products || GET METHOD
router.get("/get-all-products", getAllProductController);

// Get Single Products || GET METHOD
router.get("/get-product/:slug", getSingleProductController);

// Get Photo|| GET METHOD
router.get("/get-product-photo/:pid", getPhotoController);

// Delete Product|| Delete METHOD
router.delete("/delete-product/:pid", deleteProductController);

export default router;
