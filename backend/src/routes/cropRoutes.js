import express from "express";
import { getAllCrops, addUserCrops } from "../controllers/cropController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Protected route
router.get("/", authenticateToken, getAllCrops);
router.post("/", authenticateToken, addUserCrops);

export default router;


