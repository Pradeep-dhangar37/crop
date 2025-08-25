import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { addExpense, addIncome, getAllExpenses, getAllIncome, getExpenseTypes } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/income", authenticateToken, addIncome);
router.post("/expenses", authenticateToken, addExpense);
router.get("/expense-types", authenticateToken, getExpenseTypes);

router.get("/:crop_id/income", authenticateToken, getAllIncome);
router.get("/:crop_id/expenses", authenticateToken, getAllExpenses);


export default router;