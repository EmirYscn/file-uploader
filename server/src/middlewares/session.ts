import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "../db/queries";

// Session store configuration
const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, // Clean up expired sessions every 2 minutes
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

export const cleanupOldSessions = async (req: any, res: any, next: any) => {
  if (req.user) {
    try {
      // Find all sessions for this user
      const sessions = await prisma.session.findMany({
        where: {
          data: {
            contains: `"user":${req.user.id}`,
          },
        },
      });

      // Delete all sessions except the current one
      for (const session of sessions) {
        if (session.id !== req.sessionID) {
          await prisma.session.delete({
            where: {
              id: session.id,
            },
          });
        }
      }
    } catch (error) {
      console.error("Session cleanup error:", error);
    }
  }
  next();
};

export const sessionMiddleware = expressSession({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || "default_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  },
  proxy: true, // Add this for secure cookies behind a proxy
});
