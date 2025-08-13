// import db from "../db.js"; // MySQL connection
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Generate OTP (fixed for development)
const generateOTP = () => {
  return "1234"; // Fixed OTP for development
};

// Signup - Step 1: Send OTP
export const signup = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const { name, mobile, password, language } = req.body;

    if (!name || !mobile || !password || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if mobile already exists
    const [existing] = await db.query("SELECT * FROM users WHERE mobile_number = ?", [mobile]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP temporarily (in production, you'd use Redis or database)
    // For now, we'll store it in memory (not recommended for production)
    global.pendingSignups = global.pendingSignups || {};
    global.pendingSignups[mobile] = {
      name,
      mobile,
      password,
      language,
      otp,
      createdAt: Date.now()
    };

    // In production, send OTP via SMS service
    console.log(`OTP for ${mobile}: ${otp}`);

    res.status(200).json({
      message: "OTP sent successfully",
      otp: otp, // Remove this in production
      mobile: mobile
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Verify OTP and Complete Signup
export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ message: "Mobile and OTP are required" });
    }

    // Check if pending signup exists
    if (!global.pendingSignups || !global.pendingSignups[mobile]) {
      return res.status(400).json({ message: "No pending signup found for this mobile number" });
    }

    const pendingSignup = global.pendingSignups[mobile];

    // Check if OTP is expired (5 minutes)
    const now = Date.now();
    const otpAge = now - pendingSignup.createdAt;
    if (otpAge > 5 * 60 * 1000) { // 5 minutes
      delete global.pendingSignups[mobile];
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Verify OTP
    if (pendingSignup.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(pendingSignup.password, 10);

    await db.query("INSERT INTO users (name, mobile_number, password, language) VALUES (?, ?, ?, ?)", [
      pendingSignup.name,
      pendingSignup.mobile,
      hashedPassword,
      pendingSignup.language,
    ]);

    // Clean up pending signup
    delete global.pendingSignups[mobile];

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile and password are required" });
    }

    const [users] = await db.query("SELECT * FROM users WHERE mobile_number = ?", [mobile]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid mobile or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid mobile or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.user_id,
        mobile: user.mobile_number,
        name: user.name
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

        res.status(200).json({ 
      message: "Login successful", 
      token: token,
      user: {
        id: user.user_id,
        name: user.name,
        mobile: user.mobile_number,
        language: user.language
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user profile (protected route)
export const getUserProfile = async (req, res) => {
  try {
    const [users] = await db.query("SELECT user_id, name, mobile_number, language FROM users WHERE user_id = ?", [req.user.userId]);
    
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];
    res.status(200).json({
      user: {
        id: user.user_id,
        name: user.name,
        mobile: user.mobile_number,
        language: user.language
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
