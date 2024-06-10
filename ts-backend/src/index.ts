import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { apiKeyAuth, baseUrl, configureSecurity, port } from './middleware/auth';
import { info } from './logger';
import connectDB from './db';
import userRoutes from './routes/userRoutes';


info("Starting the server...");
const app = express();
// setting various HTTP headers
app.use(helmet());
app.use(express.json());

// Use the user routes with the /users/ prefix
info("Configuring db...");
connectDB();

app.use('/users',apiKeyAuth, userRoutes);
/**
 * GET / 
 * Default route, protected by API key authentication.
 */
app.get('/', apiKeyAuth, (req: Request, res: Response) => {
  res.send({message:'Hello,   TypeScript with Node.js and Express!'})}); 

info("Configuring security...");
// Configure security-related middleware
configureSecurity(app);
app.listen(port, () => {
  info(`Server is running at ${baseUrl}${port}`);
});