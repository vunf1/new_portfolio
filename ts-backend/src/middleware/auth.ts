import express, { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv-safe';
import cors from 'cors';

// Load environment variables from .env file and ensure they match the .env.example file
dotenv.config({
  example: './.env'
});

// Retrieve the API key from the environment variables
const apiKey = process.env.API_KEY;
export const secretKey = process.env.SECRET_KEY;
export const dbUri = process.env.MONGODB_URI;
export const port = process.env.PORT || 4000;
export const baseUrl = process.env.BASE_URL ?? "http:localhost:";
/**
 * Middleware to authenticate requests using an API key.
 * Checks the 'inside_key' header for a valid API key.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const requestKey = req.header('inside_key');
  
  if (!requestKey || requestKey !== apiKey) {
    return res.status(403).json({ message: 'Forbidden Access' });
  }
  
  next();
};


/**
 * Rate limiter middleware to limit each IP to 100 requests per 30 minutes.
 * Helps to prevent abuse and ensure fair usage.
 */
export const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes in milliseconds
  max: 250, // limit each IP to 250 requests per windowMs
});

/**
 * Configuration options for CORS (Cross-Origin Resource Sharing).
 * 
 * @property {string} origin - Specifies the allowed origin for cross-origin requests. In this case, only 'https://localhost' is allowed.
 * @property {number} optionsSuccessStatus - The status code to send for successful OPTIONS requests. Defaults to 200.
 */
export const corsOptions = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200,
  };

/**
 * Configures security-related middleware for the Express application.
 * 
 * @param {express.Application} app - The Express application instance.
 * 
 * Middleware applied:
 * - Rate Limiting: Limits the number of requests per IP to prevent abuse.
 * - CORS: Allows cross-origin requests from specified origins.
 * - JSON Body Parser: Parses incoming request bodies with JSON payloads.
 * 
 * @returns {void}
 */
export const configureSecurity = (app: express.Application) => {
    app.use(limiter);
    app.use(cors(corsOptions));
    app.use(apiKeyAuth, (req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ message: 'Service not found', error: '404' });
    });
  };