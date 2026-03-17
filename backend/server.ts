import cors from "cors";
import express from "express";
import { logger } from "./utils/logger";
import requestLogger from "./utils/logger";
import db from "./config/connection";
import dotenv from "dotenv";

// Route imports
import tripRouter from "./routes/tripPlanRoutes";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import friendsRouter from "./routes/friendsRoutes";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Start server and then connect to DB
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

// Middleware
app.use(requestLogger);
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || "1mb" }));

// Routes
app.use("/", tripRouter);
app.use('/auth', authRouter);
app.use("/user", userRouter);
app.use("/friends", friendsRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.stack);
  res.status(500).send({ message: 'Something broke!', error: err.message });
});
