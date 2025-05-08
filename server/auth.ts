import { Request, Response, NextFunction } from "express";

// Simple admin credentials for demonstration
// In a real application, this should be properly stored in a database with hashed passwords
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "adams123";

// This will hold our active admin sessions
const adminSessions: Record<string, { username: string, expiresAt: Date }> = {};

// Generate a random session ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

// Middleware to check admin authentication
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies.adminSession;

  if (!sessionId || !adminSessions[sessionId]) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  // Check if session has expired
  if (adminSessions[sessionId].expiresAt < new Date()) {
    delete adminSessions[sessionId];
    return res.status(401).json({ message: "Admin session expired" });
  }

  // Session is valid
  next();
}

// Admin login route handler
export function adminLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  // Create a new session
  const sessionId = generateSessionId();
  
  // Session expires after 1 hour
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  
  adminSessions[sessionId] = {
    username,
    expiresAt
  };

  // Set cookie with session ID
  res.cookie("adminSession", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: "strict"
  });

  res.status(200).json({ message: "Admin login successful" });
}

// Admin logout route handler
export function adminLogout(req: Request, res: Response) {
  const sessionId = req.cookies.adminSession;
  
  if (sessionId && adminSessions[sessionId]) {
    delete adminSessions[sessionId];
  }
  
  res.clearCookie("adminSession");
  res.status(200).json({ message: "Admin logout successful" });
}

// Admin status check
export function adminStatus(req: Request, res: Response) {
  const sessionId = req.cookies.adminSession;
  
  if (!sessionId || !adminSessions[sessionId] || adminSessions[sessionId].expiresAt < new Date()) {
    return res.status(200).json({ isAdmin: false });
  }
  
  res.status(200).json({ 
    isAdmin: true,
    username: adminSessions[sessionId].username 
  });
}