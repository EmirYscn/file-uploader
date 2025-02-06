import { body } from "express-validator";
import * as db from "../db/user.queries";
import bcrypt from "bcryptjs";

export const validateForm = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUser(value);
      console.log(user);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("username")
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Username can not be less than 2 and more than 30 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validatePassword = [
  body("currentPassword")
    .notEmpty()
    .trim()
    .custom(async (value, { req }) => {
      const isValid = await bcrypt.compare(value, req.user.password.toString());
      if (!isValid) {
        throw new Error("Password is not correct");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

export const validateUpdateForm = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await db.findUser(value);
      console.log(user);
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  body("username")
    .optional()
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Username can not be less than 2 and more than 30 characters"),
  body("currentPassword")
    .optional()
    .notEmpty()
    .trim()
    .custom(async (value, { req }) => {
      const isValid = await bcrypt.compare(value, req.user.password.toString());
      if (!isValid) {
        throw new Error("Password is not correct");
      }
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password can not be less than 8 characters"),
  body("confirmPassword")
    .optional()
    .if(body("password").exists())
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
