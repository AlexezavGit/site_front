import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import { pool } from "./db";
import type { User } from "@shared/schema";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

declare global {
  namespace Express {
    interface User extends Omit<import("@shared/schema").User, "password"> {}
  }
}

export function setupAuth(app: Express) {
  if (!process.env.SESSION_SECRET) {
    throw new Error(
      "SESSION_SECRET must be set. Did you forget to configure this secret?",
    );
  }

  const PgSession = connectPgSimple(session);

  app.set("trust proxy", 1);
  app.use(
    session({
      store: new PgSession({ pool, tableName: "session", createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const isDemoMode = process.env.DEMO_AUTH === "true";

  passport.use(
    new LocalStrategy({ usernameField: "username" }, async (username, password, done) => {
      try {
        // Accept login by username OR email
        let user = await storage.getUserByUsername(username);
        if (!user) user = await storage.getUserByEmail(username);
        if (!user) return done(null, false, { message: "Користувача не знайдено" });

        if (isDemoMode) {
          // Demo mode: any password accepted (captures real audience emails without friction)
          return done(null, user);
        }

        if (!(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Невірний логін або пароль" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, (user as User).id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user ?? false);
    } catch (err) {
      done(err);
    }
  });
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Необхідна автентифікація" });
  }
  next();
};

export function sanitizeUser(user: User) {
  const { password, ...rest } = user;
  return rest;
}
