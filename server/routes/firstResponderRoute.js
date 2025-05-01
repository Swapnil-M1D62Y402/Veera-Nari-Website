import express from "express";
import { getFirstResponderSOS } from "../controllers/firstResponderController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/sos", protect, getFirstResponderSOS);

export default router;