import morgan from 'morgan'
import winston from 'winston'; 

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',  // minimum log level to log
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    // Add other transports as needed (e.g., file, http)
  ],
});


const stream = {
  write: (message: string) => logger.info(message.trim()),
};
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
const requestLogger = morgan('combined', { stream, skip });
export default requestLogger

