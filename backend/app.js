import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js"
import cors from "cors";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({ origin: "*" }));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    console.log("Content-Type:", req.headers['content-type']);
    next();
});

app.use("/api/users", userRoutes);

export default app;
