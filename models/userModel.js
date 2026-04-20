import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    role: { type: String, default: "student" },
    mobileNo: { type: Number },
    nin: {type: Number,}
  },
  { timestamps: true },
);

const UserAuth = new mongoose.model("userAuth", userSchema);

export default UserAuth;



