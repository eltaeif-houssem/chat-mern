import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getFriends, getChat, addMessage } from "../controllers/chat.js";
const router = Router();

router.get("/friends", auth, getFriends);
router.get("/chat/:id", auth, getChat);
router.post("/message/:chid", auth, addMessage);

export default router;
