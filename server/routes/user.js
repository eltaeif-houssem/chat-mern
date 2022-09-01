import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";

const router = Router();

// Fetch user
router.get("/user", auth, getUser);
// Update a user
router.patch("/user", auth, updateUser);
// Delete a user
router.delete("/user", auth, deleteUser);

export default router;
