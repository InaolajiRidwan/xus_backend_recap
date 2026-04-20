import sendMailSignUp from "../lib/sendMailSignUp.js";
import sendMailLoginIn from "../lib/sendMailLogin.js";
import sendMailForgotPassword from "../lib/sendForgotPassword.js";
import UserAuth from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const handleTestServer = async (request, response) => {
  response.status(200).json({
    message: "project is running......",
  });
};

const handleSignUp = async (req, res) => {
  const { username, password, email, mobileNo, role, nin } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "All field are required",
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      message: "Password should be me more than 4",
    });
  }
  const existingEmail = await UserAuth.findOne({ email });

  if (existingEmail) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const generateRandom = Math.random() * 1000000000000;
  const nin9 = parseInt(generateRandom);

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = new UserAuth({
    username,
    email,
    password: hashPassword,
    role,
    mobileNo,
    nin: nin9,
  });

  sendMailSignUp(email);

  await newUser.save();
  return res.status(201).json({
    message: "user successfully created",
    newUser,
  });
};



const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All field are required",
    });
  }

  const user = await UserAuth.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "user does not exist",
    });
  }
  const isMatch = bcrypt.compare(user?.password, password);

  if (!isMatch) {
    return res.status(400).json({
      message: "login details is incorrect",
    });
  }

  const accessToken = jwt.sign(
    {
      id: user?._id,
    },
    `${process.env.ACCESS_TOKEN}`,
    {
      expiresIn: "5h",
    },
  );

  const refreshToken = jwt.sign(
    { id: user?.id },
    `${process.env.REFRESH_TOKEN}`,
    { expiresIn: "5h" },
  );

  //! send email notification

  sendMailLoginIn(user);

  res.status(200).json({
    message: "success",
    accessToken,
    userDetails: {
      email: user?.email,
      nin: user?.nin,
      role: user?.role,
      username: user?.username,
      mobile: user?.mobileNo,
    },
    refreshToken,
  });
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "All field are required",
    });
  }

  const findUser = await UserAuth.findOne({ email });
  if (!findUser) {
    return res.status(404).json({
      message: "user does not exist",
    });
  }

  const token = jwt.sign({ id: findUser?._id }, `${process.env.ACCESS_TOKEN}`, {
    expiresIn: "5h",
  });

  sendMailForgotPassword(findUser?.email, token);

  return res.status(200).json({
    message: "email successfull sent",
    email: findUser?.email,
  });
};

const handleResetPassword = async (req, res,) => {
  const { password } = req.body;

  const token = req.header("Authorization");

  if (!password) {
    return res.status(400).json({
      message: "input new password",
    });
  }

  const splitToken = token.split(" ");
  const realToken = splitToken[1];
  const decodeToken = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);

  const user = await UserAuth.findById(decodeToken?.id);

  const hashedPassword = await bcrypt.hash(password, 12);

  user.password = hashedPassword;

  await user.save();
  console.log(user);

  return res.status(201).json({
    message: "password successfully changed",
    newUser: user,
  });

  
};

const handleGetAllUser = async (req, res) => {
  const allUser = await UserAuth.find();
  return res.status(200).json({
    message: "successful",
    allUser,
  });
};

export {
  handleTestServer,
  handleSignUp,
  handleLogin,
  handleGetAllUser,
  handleForgotPassword,
  handleResetPassword,
};
