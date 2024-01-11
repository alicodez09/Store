import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  getSingleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

// Router Object
const router = express.Router();

//! Create Category || POST METHOD
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//! Update Category || PUT METHOD
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//! Get All Categories|| GET METHOD
router.get("/get-categories", requireSignIn, isAdmin, getAllCategoryController);

//! Get Single Categories|| GET METHOD
router.get(
  "/get-categories/:slug",
  requireSignIn,
  isAdmin,
  getSingleCategoryController
);

//! Delete Categories|| DELETE METHOD
router.delete("/delete/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;
