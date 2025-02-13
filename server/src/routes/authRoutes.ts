import express from "express";

import * as authController from "../controllers/authController";

import { validateForm } from "../middlewares/validateForm";

import passport from "../strategies/passport";

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

router.post("/signup", validateForm, authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/verify", authController.verifyAuth);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
    successRedirect: `${CLIENT_URL}/all`,
  })
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${CLIENT_URL}/login`,
    successRedirect: `${CLIENT_URL}/all`,
  })
);

export { router };
