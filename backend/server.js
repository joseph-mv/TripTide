const cors = require("cors");
var express = require("express");
var logger = require("./utils/logger");
var db = require("./config/connection");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

var app = express();
db.connect((err) => {
  if (err) {
    console.log("connection error");
  } else {
    console.log("db connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
});

const tripRouter = require("./routes/tripPlanRoutes");
const authRouter=require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes");
const friendsRouter =require('./routes/friends')


app.use(logger);
app.use(cors());

app.use(express.json({ limit: "1mb" }));

app.use("/", tripRouter);
app.use('/auth',authRouter)
app.use("/user", userRouter);
app.use("/friends",friendsRouter );


