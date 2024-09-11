var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db=require('./config/connection')
require('dotenv').config();





var app = express();
db.connect((err)=>{
    if (err){console.log("connection error")}
    else 
    console.log('connected successfully');
    
    });
    

var tripRouter=require('./routes/tripPlan')
var userRouter = require('./routes/user');
// var adminRouter = require('./routes/admin');



app.use(cors())


// app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/', tripRouter);
app.use('/user', userRouter);
// app.use('/admin', adminRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
