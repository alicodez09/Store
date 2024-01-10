import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";

//! Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, secret_word } = req.body;
    // validations
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "Email is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }

    if (!secret_word) {
      res.send({ message: "Secret word is required" });
    }

    // Checking the users
    const existingUser = await userModel.findOne({ email });
    // Existing Users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered please login",
      });
    }
    // Register User
    const hashedPassword = await hashPassword(password);
    // Saving the Password
    const user = await new userModel({
      name,
      email,

      secret_word,
      password: hashedPassword,
    }).save();
    console.log({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
    res.status(200).send({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
//! Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Checking the User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Encrypting the Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //! Creating a token(token provides users with access to protected pages and resources for a limited period of time without having to re-enter their username and password.)
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      data: {
        name: user.name,
        email: user.email,

        secret_word: user.secret_word,
        role: user.role,
      },
      token,
    });
    console.log(
      {
        success: true,
        message: "Login Successfully",
        data: {
          name: user.name,
          email: user.email,

          role: user.role,
        },
        token,
      },
      "user_data"
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, secret_word } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!secret_word) {
      res.status(400).send({ message: "Secret word is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    // checking by email and secret word
    const user = await userModel.findOne({ email, secret_word });
    // validations

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or secret_word",
      });
    }

    const hashed = await hashPassword(newPassword);

    const result = await userModel.findByIdAndUpdate(user._id, {
      password: hashed,
    });
    console.log(result);
    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something wents wrong",
      error,
    });
  }
};
//! TEST CONTROLLER
const testController = async (req, res) => {
  console.log("protected route");
  res.status(200).send({
    success: true,
    message: "protected route",
  });
};
const adminController = async (req, res) => {
  console.log("protected route");
  res.status(200).send({
    success: true,
    message: "admin protected route",
  });
};
export {
  loginController,
  registerController,
  forgotPasswordController,
  testController,
  adminController,
};
