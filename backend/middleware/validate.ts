import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { errorResponse } from "../utils/apiResponse";

type ValidationSchema = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

type ValidationErrorItem = {
  field: string;
  message: string;
};

const formatZodErrors = (
  error: ZodError,
  target: "body" | "query" | "params"
): ValidationErrorItem[] => {
  return error.issues.map((issue) => ({
    field: issue.path.length ? `${target}.${issue.path.join(".")}` : target,
    message: issue.message,
  }));
};

export const validate = (schemas: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationErrors: ValidationErrorItem[] = [];

    if (schemas.body) {
      const parsedBody = schemas.body.safeParse(req.body);
      if (!parsedBody.success) {
        validationErrors.push(...formatZodErrors(parsedBody.error, "body"));
      } else {
        req.validatedBody = parsedBody.data;
      }
    }

    if (schemas.query) {
      const parsedQuery = schemas.query.safeParse(req.query);
      if (!parsedQuery.success) {
        validationErrors.push(...formatZodErrors(parsedQuery.error, "query"));
      } else {
        req.validatedQuery = parsedQuery.data;
      }
    }

    if (schemas.params) {
      const parsedParams = schemas.params.safeParse(req.params);
      if (!parsedParams.success) {
        validationErrors.push(...formatZodErrors(parsedParams.error, "params"));
      } else {
        req.validatedParams = parsedParams.data;
      }
    }

    if (validationErrors.length > 0) {
      errorResponse(res, validationErrors[0].message, 400, validationErrors);
      return;
    }

    next();
  };
};
