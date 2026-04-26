import { Response } from 'express';

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  meta: Record<string, any> = {}
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    error: null,
    meta
  });
};

export const errorResponse = (
  res: Response,
  message: string = "Something went wrong",
  statusCode: number = 500,
  error: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    error,
    meta: {}
  });
};
