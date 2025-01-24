import express from "express";
import * as authController from "../controllers/authController";
import * as usersController from "../controllers/usersController";
import { validateForm } from "../middlewares/validateForm";

const router = express.Router();

router.post("/api/signup", validateForm, authController.signup);
router.post("/api/login", usersController.login);

router.get("/api/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

router.get("/api/logout", usersController.logout);

router.get("/api/search/user/", usersController.searchUser);

export { router };
