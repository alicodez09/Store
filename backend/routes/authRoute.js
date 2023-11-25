import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
// router object
const router = express.Router();
// routing
// REGISTER || POST METHOD
router.post("/register", registerController);

router.post("/login", loginController);

export default router;
