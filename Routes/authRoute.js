import express from "express"
import { handleForgotPassword, handleGetAllUser, handleLogin, handleResetPassword, handleSignUp, handleTestServer } from "../controllers/index.js";
import { authentication } from "../middleware/index.js";

const authRoute = express.Router()

authRoute.get("/api/v1", handleTestServer)
authRoute.post("/api/v1/sign-up", handleSignUp)
authRoute.post("/api/v1/login", handleLogin);
authRoute.post("/api/v1/forget-password", authentication, handleForgotPassword);
authRoute.patch("/api/v1/reset-password", handleResetPassword)
authRoute.get("/api/v1/all-user", authentication, handleGetAllUser);

export default authRoute;
