// const express = require("express")
import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import {
  handleForgotPassword,
  handleGetAllUser,
  handleLogin,
  handleResetPassword,
  handleSignUp,
  handleTestServer,
} from "./controllers/index.js";
import { authentication } from "./middleware/index.js";
import routes from "./Routes/index.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL
  
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("MONGO_DB connected 💻");
    app.listen(PORT, () => {
      console.log("server is running on 🏃🏼‍♂️‍➡️🏃🏼‍♂️‍➡️", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors())

app.use(routes)


