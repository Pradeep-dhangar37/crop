import db from "../config/db.js";

// ================== CROPS ==================
export const getAllCrops = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [allCrops] = await db.query("SELECT crop_id, crop_name, image_url FROM crops");
    const [userCrops] = await db.query("SELECT crop_id FROM user_crops WHERE user_id = ?", [userId]);

    const userCropIds = new Set(userCrops.map((uc) => uc.crop_id));

    const cropsWithSelection = allCrops.map((crop) => ({
      ...crop,
      isSelected: userCropIds.has(crop.crop_id),
    }));

    res.status(200).json({
      message: "Crops fetched successfully",
      crops: cropsWithSelection,
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUserCrops = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { selectedCropIds } = req.body;

    if (!Array.isArray(selectedCropIds)) {
      return res.status(400).json({ message: "selectedCropIds must be an array" });
    }

    await db.query("START TRANSACTION");

    try {
      await db.query("DELETE FROM user_crops WHERE user_id = ?", [userId]);

      if (selectedCropIds.length > 0) {
        const values = selectedCropIds.map((cropId) => [userId, cropId]);
        await db.query("INSERT INTO user_crops (user_id, crop_id) VALUES ?", [values]);
      }

      await db.query("COMMIT");
      res.status(200).json({ message: "User crops updated successfully", selectedCropIds });
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Error updating user crops:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================== PROFIT ==================
export const getUserProfit = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [profitData] = await db.query(
      `
      SELECT 
        c.crop_id,
        c.crop_name,
        c.image_url,
        IFNULL(SUM(i.income_amount), 0) - IFNULL(SUM(e.expense_amount), 0) AS profit
      FROM user_crops uc
      JOIN crops c ON uc.crop_id = c.crop_id
      LEFT JOIN income i ON i.crop_id = c.crop_id AND i.user_id = uc.user_id
      LEFT JOIN expense e ON e.crop_id = c.crop_id AND e.user_id = uc.user_id
      WHERE uc.user_id = ?
      GROUP BY c.crop_id, c.crop_name, c.image_url
      `,
      [userId]
    );

    const totalProfit = profitData.reduce((acc, crop) => acc + Number(crop.profit), 0);

    res.status(200).json({
      message: "Profit calculated successfully",
      totalProfit,
      crops: profitData.map((crop) => ({
        crop_id: crop.crop_id,
        crop_name: crop.crop_name,
        image_url: crop.image_url,
        profit: Number(crop.profit),
      })),
    });
  } catch (error) {
    console.error("Error calculating profit:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================== single Crop Profit ==================

export const getCropProfit = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { cropId } = req.params;

    const [[result]] = await db.query(
      `
      SELECT 
        IFNULL(SUM(i.income_amount), 0) AS totalIncome,
        IFNULL(SUM(e.expense_amount), 0) AS totalExpense,
        IFNULL(SUM(i.income_amount), 0) - IFNULL(SUM(e.expense_amount), 0) AS profit
      FROM user_crops uc
      LEFT JOIN income i ON i.crop_id = uc.crop_id AND i.user_id = uc.user_id
      LEFT JOIN expense e ON e.crop_id = uc.crop_id AND e.user_id = uc.user_id
      WHERE uc.user_id = ? AND uc.crop_id = ?
      `,
      [userId, cropId]
    );

    res.status(200).json({
      cropId,
      totalIncome: Number(result.totalIncome),
      totalExpense: Number(result.totalExpense),
      profit: Number(result.profit),
    });
  } catch (error) {
    console.error("Error fetching crop profit:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
