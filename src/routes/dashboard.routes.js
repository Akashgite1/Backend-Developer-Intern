import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  summary,
  category,
  recent,
  trends
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", protect, summary);
router.get("/category", protect, category);
router.get("/recent", protect, recent);
router.get("/trends", protect, trends);

export default router;