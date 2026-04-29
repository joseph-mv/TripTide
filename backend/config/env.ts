import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
  JSON_BODY_LIMIT: z.string().default("1mb"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
}); 

export type Env = z.infer<typeof envSchema>;
export const env: Env = envSchema.parse(process.env);
