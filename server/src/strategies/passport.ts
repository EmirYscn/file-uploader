import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Profile as GoogleProfile } from "passport-google-oauth20";

import { Strategy as GithubStrategy } from "passport-github2";
import { Profile as GithubProfile } from "passport-github2";

import bcrypt from "bcryptjs";

import * as db from "../db/user.queries";
import { User } from "@prisma/client";
import { prisma } from "../db/prismaClient";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";

const verifyCallback = async (email: string, password: string, done: any) => {
  try {
    const user = await db.findUser(email);
    if (!user) return done(null, false, { message: "No user with that email" });

    const isValid = await bcrypt.compare(password, user.password!.toString());
    if (!isValid) return done(null, false, { message: "Password incorrect" });

    done(null, user);
  } catch (error) {
    return done(error);
  }
};

const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  verifyCallback
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${SERVER_URL}/api/auth/google/callback`,
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: (error: any, user?: any) => void
  ) {
    let findUser;

    try {
      findUser = await prisma.user.findUnique({
        where: { email: profile.emails?.[0]?.value },
      });
    } catch (error) {
      return done(error);
    }

    try {
      if (!findUser) {
        const newUser = await prisma.user.create({
          data: {
            email: profile.emails![0].value,
            username: profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
          },
        });

        return done(null, newUser);
      }
      return done(null, findUser);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

const githubStrategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: `${SERVER_URL}/api/auth/google/callback`,
    scope: ["user:email"],
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: (error: any, user?: any) => void
  ) {
    let findUser;

    try {
      findUser = await prisma.user.findUnique({
        where: { email: profile.emails?.[0]?.value },
      });
    } catch (error) {
      return done(error);
    }

    try {
      if (!findUser) {
        const newUser = await prisma.user.create({
          data: {
            email: profile.emails![0].value,
            username: profile.username || profile.displayName,
            avatarUrl: profile.photos?.[0]?.value,
          },
        });

        return done(null, newUser);
      }
      return done(null, findUser);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  }
);

passport.use("local", localStrategy);
passport.use("google", googleStrategy);
passport.use("github", githubStrategy);

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
