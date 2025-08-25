import express from "express";
import { getAllCrops, getCropProfit, getUserProfit, updateUserCrops } from "../controllers/cropController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Protected route
router.get("/", authenticateToken, getAllCrops);
router.post("/update", authenticateToken, updateUserCrops);
router.get('/profit', authenticateToken, getUserProfit)
router.get("/:cropId/cropProfit",authenticateToken, getCropProfit);

// router.post("/income", authenticateToken, addIncome);
// router.post("/expenses", authenticateToken, addExpense);
// router.get("/expense-types", authenticateToken, getExpenseTypes);
export default router;


