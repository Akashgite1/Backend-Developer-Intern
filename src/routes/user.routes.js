import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/authorize.middleware.js";
import { ROLES } from "../utils/roles.js";

const router = express.Router();

// Only ADMIN can access users
router.get("/", protect, authorizeRoles(ROLES.ADMIN), (req, res) => {
  res.send("Get all users");
});

export default router;