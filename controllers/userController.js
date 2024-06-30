import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import validator from "validator";

dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

//register user
const registerUser = async (req, res) => {
  const { name, password, email, userType } = req.body;
  try {
    //checking if user is already present
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      userType: userType,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//login login
const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ success: false, message: "User doesn't exists!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.json({
        success: false,
        message: "PassWord did not match! Try again!",
      });
    }
    if (userType !== user.userType) {
      res.json({
        success: false,
        message: "User Type did not match! Try again!",
      });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { registerUser, loginUser };
