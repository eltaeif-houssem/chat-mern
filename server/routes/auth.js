import { Router } from "express";
import auth from "../middlewares/auth.js";
import { register, login, logout } from "../controllers/auth.js";
const router = Router();

// Register a user
router.post("/register", register);
// Login a user
router.post("/login", login);
// Logout a user
router.delete("/logout", auth, logout);

export default router;
