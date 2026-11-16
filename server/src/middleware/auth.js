import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD
    if (req.admin.role === "customer") return res.status(403).json({ message: "Admin access required." });
=======
>>>>>>> 8c310ee99bf1474734a2671225b7506f5dcd95a5
    next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please sign in again." });
  }
}
