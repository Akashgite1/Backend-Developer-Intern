/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data
 */

/**
 * @swagger
 * /api/dashboard/category:
 *   get:
 *     summary: Category breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category totals
 */

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Recent transactions
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent records
 */

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Monthly trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trends data
 */

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