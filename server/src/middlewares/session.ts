import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../db/queries";

export const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET || "default_secret_key",
  resave: false, // ❌ Prevents re-saving sessions when unchanged
  saveUninitialized: false, // ❌ Prevents creating empty sessions
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // Cleans expired sessions every 2 min
    dbRecordIdIsSessionId: true,
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: "none",
    secure: true, // ✅ Use secure cookies only in production
    httpOnly: false, // ✅ Prevents client-side access
  },
});
