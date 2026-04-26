import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  return errorResponse(res, err.message, 500, err);
};

export default errorHandler;
