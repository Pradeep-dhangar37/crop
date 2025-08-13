import express from "express";
import { signup, login, verifyOtp, getUserProfile } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/profile", authenticateToken, getUserProfile);

export default router;
