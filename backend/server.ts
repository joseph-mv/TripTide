import cors from "cors";
import express from "express";
import logger from "./utils/logger";
import db from "./config/connection";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

var app = express();
db.connect((err: any) => {
  if (err) {
    console.log("connection error");
  } else {
    console.log("db connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

import tripRouter from "./routes/tripPlanRoutes";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import friendsRouter from "./routes/friendsRoutes";


app.use(logger);
app.use(cors());

app.use(express.json({ limit: "1mb" }));

app.use("/", tripRouter);
app.use('/auth', authRouter)
app.use("/user", userRouter);
app.use("/friends", friendsRouter);




