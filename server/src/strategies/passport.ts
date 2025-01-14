import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import * as db from "../db/user.queries";
import { User } from "@prisma/client";

const verifyCallback = async (email: string, password: string, done: any) => {
  try {
    const user = await db.findUser(email);
    if (!user) return done(null, false, { message: "No user with that email" });

    const isValid = await bcrypt.compare(password, user.password.toString());
    if (!isValid) return done(null, false, { message: "Password incorrect" });

    done(null, user);
  } catch (error) {
    return done(error);
  }
};

const strategy = new Strategy({ usernameField: "email" }, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await db.findUserById(id);
    if (!user) throw new Error("User not found");
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
