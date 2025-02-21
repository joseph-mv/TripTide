var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
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
var tripRouter = require("./routes/tripPlan");
var userRouter = require("./routes/user");

// var adminRouter = require('./routes/admin');
app.use(logger);
app.use(cors());

// app.use(logger('dev'));
app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use("/", tripRouter);
app.use("/user", userRouter);
// app.use('/admin', adminRouter);

// Start server
