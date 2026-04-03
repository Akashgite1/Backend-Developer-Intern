/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a new record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [INCOME, EXPENSE]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 */

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of records
 */

/**
 * @swagger
 * /api/records/{id}:
 *   patch:
 *     summary: Update a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record updated
 */

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Record deleted
 */

import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/authorize.middleware.js";
import { ROLES } from "../utils/roles.js";
import {
  create,
  getAll,
  update,
  remove
} from "../controllers/record.controller.js";

const router = express.Router();

// View (all roles)
router.get("/", protect, getAll);

// Create (Admin only)
router.post("/", protect, authorizeRoles(ROLES.ADMIN), create);

// Update (Admin + Analyst)
router.patch(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.ANALYST),
  update
);

// Delete (Admin only)
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  remove
);

export default router;