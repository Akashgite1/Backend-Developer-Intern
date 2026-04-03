/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged-in user 
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 */

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/change-password:
 *   put:
 *     summary: Change password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Generate reset password token
 *     tags: [Users]
 */

/**
 * @swagger
 * /api/users/reset-password/{token}:
 *   put:
 *     summary: Reset password using token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 */

import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword
} from "../controllers/user.controller.js";
import { authorizeRoles } from "../middleware/authorize.middleware.js";
import { ROLES } from "../utils/roles.js";

const router = express.Router();

// Admin only
router.get("/", protect, authorizeRoles(ROLES.ADMIN), getAllUsers);

// Current user
router.get("/me", protect, getProfile);

// Update profile
router.put("/me", protect, updateProfile);

// Change password
router.put("/change-password", protect, changePassword);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.put("/reset-password/:token", resetPassword);

export default router;