import express from "express";

import * as authController from "../controllers/authController";

import { validateForm } from "../middlewares/validateForm";

import passport from "../strategies/passport";

const router = express.Router();

router.post("/signup", validateForm, authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/verify", authController.verifyAuth);

// delete later
router.get("/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/",
  })
);

export { router };
