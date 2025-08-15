import db from "../config/db.js";

// Get all crops with user's selected crops
export const getAllCrops = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get all crops
    const [allCrops] = await db.query("SELECT crop_id, crop_name, image_url FROM crops");

    // Get user's selected crops
    const [userCrops] = await db.query(
      "SELECT crop_id FROM user_crops WHERE user_id = ?",
      [userId]
    );

    // Create a set of user's crop IDs for quick lookup
    const userCropIds = new Set(userCrops.map(uc => uc.crop_id));

    // Mark crops as selected if user has them
    const cropsWithSelection = allCrops.map(crop => ({
      ...crop,
      isSelected: userCropIds.has(crop.crop_id)
    }));

    res.status(200).json({
      message: "Crops fetched successfully",
      crops: cropsWithSelection
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Update user's selected crops
export const updateUserCrops = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { selectedCropIds } = req.body;

    if (!Array.isArray(selectedCropIds)) {
      return res.status(400).json({ message: "selectedCropIds must be an array" });
    }

    // Start transaction
    await db.query("START TRANSACTION");

    try {
      // Delete all existing user crops
      await db.query("DELETE FROM user_crops WHERE user_id = ?", [userId]);

      // Insert new selected crops
      if (selectedCropIds.length > 0) {
        const values = selectedCropIds.map(cropId => [userId, cropId]);
        await db.query(
          "INSERT INTO user_crops (user_id, crop_id) VALUES ?",
          [values]
        );
      }

      // Commit transaction
      await db.query("COMMIT");

      res.status(200).json({
        message: "User crops updated successfully",
        selectedCropIds: selectedCropIds
      });
    } catch (error) {
      // Rollback on error
      await db.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Error updating user crops:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
