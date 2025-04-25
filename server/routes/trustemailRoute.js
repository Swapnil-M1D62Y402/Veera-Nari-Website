import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { updateTrustedEmail } from "../controllers/trustedemailController.js";
const router = express.Router()

router.put('/', protect, updateTrustedEmail);

export default router;