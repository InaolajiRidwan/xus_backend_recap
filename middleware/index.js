import jwt from "jsonwebtoken";
import UserAuth from "../models/userModel.js";

const authentication = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({
      message: "All field required",
    });
  }
  const splitToken = token.split(" ");
  const realToken = splitToken[1];
  const decodeToken = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);
  console.log(decodeToken);
  if (!decodeToken) {
    return res.status(402).json({
      message: "you're not to view page",
    });
  }

  const user = await UserAuth.findById(decodeToken.id);
  console.log(user);
  req.user = user;

  next();
};

export { authentication };
