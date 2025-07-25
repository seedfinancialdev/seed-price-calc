import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { HubSpotService } from "./hubspot";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
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

export function setupAuth(app: Express) {
  // Initialize HubSpot service for user verification
  let hubSpotService: HubSpotService | null = null;
  try {
    hubSpotService = new HubSpotService();
  } catch (error) {
    console.warn('HubSpot service not available for user verification:', error);
  }

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || 'seed-financial-quote-calculator',
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // Use email as username field
      async (email, password, done) => {
        try {
          let user = await storage.getUserByEmail(email);
          
          // If user doesn't exist, create them automatically for verified @seedfinancial.io emails
          if (!user) {
            console.log(`User not found for email: ${email}, attempting auto-registration...`);
            
            // Validate email domain
            if (!email.endsWith('@seedfinancial.io')) {
              console.log(`Invalid email domain for: ${email}`);
              return done(null, false);
            }

            // Verify user exists in HubSpot
            if (hubSpotService) {
              try {
                const hubSpotUserExists = await hubSpotService.verifyUserByEmail(email);
                if (!hubSpotUserExists) {
                  console.log(`Email ${email} not found in HubSpot - access denied`);
                  return done(null, false);
                }
                console.log(`Email ${email} verified in HubSpot`);
              } catch (error) {
                console.error(`HubSpot verification failed for ${email}:`, error);
                return done(null, false);
              }
            } else {
              console.log(`Warning: HubSpot verification not available, denying access for ${email}`);
              return done(null, false);
            }

            // Create user automatically with default password
            console.log(`Creating new user for ${email} with default password`);
            try {
              user = await storage.createUser({
                email,
                password: await hashPassword('SeedAdmin1!'), // Default password
                firstName: '',
                lastName: '',
                hubspotUserId: null,
              });
              console.log(`Successfully created user with ID: ${user.id}`);
            } catch (createError: any) {
              // Handle race condition - if another request created the user first
              if (createError.code === '23505' || createError.message?.includes('unique constraint')) {
                console.log(`User creation race condition detected for ${email}, fetching existing user`);
                user = await storage.getUserByEmail(email);
                if (!user) {
                  console.error(`Failed to fetch user after race condition for ${email}`);
                  return done(null, false);
                }
              } else {
                console.error(`Failed to create user for ${email}:`, createError);
                return done(createError);
              }
            }
          } else {
            // For existing users, also verify they still exist in HubSpot
            if (hubSpotService) {
              try {
                const hubSpotUserExists = await hubSpotService.verifyUserByEmail(email);
                if (!hubSpotUserExists) {
                  console.log(`Existing user ${email} no longer found in HubSpot - access denied`);
                  return done(null, false);
                }
              } catch (error) {
                console.error(`HubSpot verification failed for existing user ${email}:`, error);
                return done(null, false);
              }
            } else {
              console.log(`Warning: HubSpot verification not available, denying access for existing user ${email}`);
              return done(null, false);
            }
          }
          
          // Check password
          if (!(await comparePasswords(password, user.password))) {
            return done(null, false);
          }
          
          return done(null, user);
        } catch (error) {
          console.error('Authentication error:', error);
          return done(error);
        }
      }
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Validate email domain
      if (!email.endsWith('@seedfinancial.io')) {
        return res.status(400).json({ 
          message: "Only @seedfinancial.io email addresses are allowed" 
        });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Verify user exists in HubSpot
      if (!hubSpotService) {
        return res.status(500).json({ message: "HubSpot service not available" });
      }
      
      const hubspotVerification = await hubSpotService.verifyUser(email);
      if (!hubspotVerification.exists) {
        return res.status(400).json({ 
          message: "Email not found in HubSpot. Please contact your administrator." 
        });
      }

      // Create user with HubSpot data
      const user = await storage.createUser({
        email,
        password: await hashPassword(password || 'SeedAdmin1!'), // Use provided password or default
        firstName: hubspotVerification.userData?.firstName || '',
        lastName: hubspotVerification.userData?.lastName || '',
        hubspotUserId: hubspotVerification.userData?.hubspotUserId || null,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/login", async (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json({
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json({
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    });
  });

  // Test endpoint for HubSpot verification
  app.post("/api/test-hubspot", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      if (!hubSpotService) {
        return res.status(500).json({ message: "HubSpot service not available" });
      }
      
      const result = await hubSpotService.verifyUser(email);
      res.json(result);
    } catch (error: any) {
      console.error('HubSpot test error:', error);
      res.status(500).json({ message: "HubSpot test failed", error: error.message });
    }
  });
}

// Middleware to require authentication
export function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}