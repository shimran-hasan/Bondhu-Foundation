import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import Admin from "../models/Admin.js";
import { protect } from "../middleware/auth.js";

const router = Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

router.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || "").toLowerCase().trim();
    const password = String(req.body.password || "");
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
<<<<<<< HEAD
    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
=======
    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name }, process.env.JWT_SECRET, { expiresIn: "8h" });
>>>>>>> 8c310ee99bf1474734a2671225b7506f5dcd95a5
    res.json({ token, admin: { name: admin.name, email: admin.email } });
  } catch (error) { next(error); }
});

router.get("/me", protect, async (req, res) => {
  res.json({ admin: { name: req.admin.name, email: req.admin.email } });
});

export default router;
