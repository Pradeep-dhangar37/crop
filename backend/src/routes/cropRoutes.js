import express from "express";
import { getAllCrops, updateUserCrops } from "../controllers/cropController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Protected route
router.get("/", authenticateToken, getAllCrops);
router.post("/update", authenticateToken, updateUserCrops);

export default router;


