const morgan=require('morgan')


const stream = {
  write: (message) => console.log(message),
};
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
const logger = morgan('combined', { stream, skip });
module.exports=logger