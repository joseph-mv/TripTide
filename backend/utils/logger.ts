import morgan from 'morgan'


const stream = {
  write: (message: string) => console.log(message),
};
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
const logger = morgan('combined', { stream, skip });
export default logger

