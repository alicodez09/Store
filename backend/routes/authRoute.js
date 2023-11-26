import express from "express";
import {
  adminController,
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();

// REGISTER || POST METHOD
router.post("/register", registerController);
// LOGIN || POST METHOD
router.post("/login", loginController);
// TEST FOR MIDDLEWARES|| GET METHOD
router.get("/test", requireSignIn, testController);
router.get("/admin", requireSignIn, isAdmin, adminController);

export default router;
