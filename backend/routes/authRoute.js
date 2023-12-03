import express from "express";
import {
  adminController,
  forgotPasswordController,
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

// FORGOT PASSWORD || POST METHOD
router.post("/reset-password", forgotPasswordController);

// TEST FOR MIDDLEWARES|| GET METHOD
router.get("/test", requireSignIn, testController);
router.get("/admin", requireSignIn, isAdmin, adminController);

// Private Route for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// Private Route for Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
