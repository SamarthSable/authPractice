import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();

// createuser
async function createUser(user) {
  const { userName, email, password } = user;
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name: userName,
    email: email,
    password: hashedPass,
  });
  return hashedPass;
}

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRETE,
  );
}
// register
router.post("/register", async (req, res) => {
  const user = req.body;
  const hashedPass = await createUser(user);

  res.status(201).json({
    success: true,
    message: "User registered",
  });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const found = await bcrypt.compare(password, user.password);
  if (found) {
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "Login Success",
    });
  } else {
    return res.status(201).json({
      message: "invalid Pass",
    });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);

  res.send(user);
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged Out");
});
export default router;
