import express, { Request, Response } from "express";

import * as authController from "../controllers/authController";

import { validateForm } from "../middlewares/validateForm";

import passport from "../strategies/passport";
import { cleanupOldSessions } from "../middlewares/session";

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

router.post("/signup", validateForm, authController.signup);
router.post(
  "/login",
  authController.login,
  cleanupOldSessions,
  (req: Request, res: Response) => {
    res.status(200).json(req.user);
  }
);
router.get("/logout", authController.logout);

router.get("/verify", authController.verifyAuth);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${CLIENT_URL}/login`,
//     successRedirect: `${CLIENT_URL}/all`,
//   })
// );

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     failureRedirect: `${CLIENT_URL}/login`,
//     successRedirect: `${CLIENT_URL}/all`,
//   })
// );

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${CLIENT_URL}/login` }),
  cleanupOldSessions,
  (req, res) => {
    res.redirect(`${CLIENT_URL}/all`);
  }
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: `${CLIENT_URL}/login` }),
  cleanupOldSessions,
  (req, res) => {
    res.redirect(`${CLIENT_URL}/all`);
  }
);

export { router };
