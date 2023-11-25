import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";
//! Register Controller

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
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
    if (!phone) {
      res.send({ message: "Phone No is required" });
    }
    if (!address) {
      res.send({ message: "Home Address is required" });
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
      address,
      phone,
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
    // !Creating a token(token provides users with access to protected pages and resources for a limited period of time without having to re-enter their username and password.)
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
    console.log(token, "token");
    console.log(
      {
        success: true,
        message: "Login Successfully",
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
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

export { loginController, registerController };
