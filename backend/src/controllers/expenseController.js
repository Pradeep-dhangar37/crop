import db from "../config/db.js";


export const addIncome = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { crop_id, income_name, income_date, income_amount } = req.body;
  
      if (!crop_id || !income_name || !income_date || !income_amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      await db.query(
        `INSERT INTO income (user_id, crop_id, income_name, income_date, income_amount) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, crop_id, income_name, income_date, income_amount]
      );
  
      res.status(201).json({ message: "Income added successfully" });
    } catch (error) {
      console.error("Error adding income:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // ================== EXPENSE ==================
  export const addExpense = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { crop_id, expense_category_id, expense_date, expense_amount } = req.body;
  
      if (!crop_id || !expense_category_id || !expense_date || !expense_amount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      await db.query(
        `INSERT INTO expense (user_id, crop_id, expense_category_id, expense_date, expense_amount) 
         VALUES (?, ?, ?, ?, ?)`,
        [userId, crop_id, expense_category_id, expense_date, expense_amount]
      );
  
      res.status(201).json({ message: "Expense added successfully" });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // ================== EXPENSE TYPES ==================
  export const getExpenseTypes = async (req, res) => {
    try {
      const [rows] = await db.query(
        "SELECT category_id, category_name FROM expense_category ORDER BY category_name ASC"
      );
  
      res.status(200).json({ message: "Expense types fetched successfully", types: rows });
    } catch (error) {
      console.error("Error fetching expense types:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };





  export const getAllIncome = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { crop_id } = req.params;
  
      if (!crop_id) {
        return res.status(400).json({ message: "Crop ID is required" });
      }
  
      const [rows] = await db.query(
        `SELECT income_id, income_name, income_date, income_amount 
         FROM income 
         WHERE user_id = ? AND crop_id = ? 
         ORDER BY income_date DESC`,
        [userId, crop_id]
      );
  
      res.status(200).json({ message: "Income fetched successfully", income: rows });
    } catch (error) {
      console.error("Error fetching income:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  // ================== GET ALL EXPENSES ==================
  export const getAllExpenses = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { crop_id } = req.params;
  
      if (!crop_id) {
        return res.status(400).json({ message: "Crop ID is required" });
      }
  
      const [rows] = await db.query(
        `SELECT e.expense_id, ec.category_name, e.expense_date, e.expense_amount 
         FROM expense e
         JOIN expense_category ec ON e.expense_category_id = ec.category_id
         WHERE e.user_id = ? AND e.crop_id = ?
         ORDER BY e.expense_date DESC`,
        [userId, crop_id]
      );
  
      res.status(200).json({ message: "Expenses fetched successfully", expenses: rows });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  