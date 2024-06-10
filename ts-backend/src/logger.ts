import fs from 'fs';
import path from 'path';

// Define log file path
const logFilePath = path.join(__dirname, 'app.log');

// Function to write log to file
const writeLog = (level: string, message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${level.toUpperCase()}: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

// Info log
export const info = (message: string) => {
  console.log(`INFO: ${message}`);
  writeLog('info', message);
};

// Warn log
export const warn = (message: string) => {
  console.warn(`WARN: ${message}`);
  writeLog('warn', message);
};

// Error log
export const error = (message: string) => {
  console.error(`ERROR: ${message}`);
  writeLog('error', message);
};

// Debug log
export const debug = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`DEBUG: ${message}`);
    writeLog('debug', message);
  }
};
