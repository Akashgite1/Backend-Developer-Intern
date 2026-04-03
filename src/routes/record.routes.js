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