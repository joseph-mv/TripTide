import cors from "cors";
import express from "express";
import { logger } from "./utils/logger";
import requestLogger from "./utils/logger";
import db from "./config/connection";
import { env } from "./config/env";

import tripRouter from "./routes/tripPlanRoutes";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import friendsRouter from "./routes/friendsRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(requestLogger);
app.use(cors({
  origin: env.CLIENT_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));

// Routes
app.use("/api/trips", tripRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/friends", friendsRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  db.connect((err: Error | null) => {
    if (err) {
      logger.error("Database connection error:", err);
      process.exit(1); // Exit the process with an error code
    } else {
      logger.info("Database connected successfully");
    }
  });
});
