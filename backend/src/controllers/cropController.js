import db from "../config/db.js";

// Get all crops
export const getAllCrops = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT crop_id, crop_name, image_url FROM crops");

    res.status(200).json({
      message: "Crops fetched successfully",
      crops: rows
    });
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
