const db = require('../config/connection')
const promise = require("promise");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");

const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const sendOtp = require('../utils/sendOtp');

module.exports = {
  signUp: (user) => {
    // console.log(user)
    return new promise(async (resolve, reject) => {
      const oldUser = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({ email: user.email });
      if (oldUser) {
        //   console.log('already user')
        resolve({ error: 'oops , The email is already used, try another' });
      } else {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = verificationToken;
        user.isVerified = false;
        user.createdAt=new Date()
        await db.get()
          .collection(collection.User_Collection)
          .insertOne(user)
          .then((data) => {

            // resolve({ data, status: true });
          });
        const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        const emailRes = await sendVerificationEmail(user.email, verificationLink)
        resolve(emailRes)

      }
    });
  },
  verifyEmail: (token) => {
    // console.log(token)
    return new promise(async (resolve, reject) => {
      const user = await db
        .get()
        .collection(collection.User_Collection)
        .findOneAndUpdate(
          { verificationToken: token },
          { $set: { isVerified: true } },
          { returnOriginal: false }
        );

      if (!user?.isVerified) {

        reject({ error: 'Invalid or expired token' });
      } else {
        resolve({ msg: 'Email verified successfully' });
      }
    });
  },
  
  login: (user) => {
    // console.log(user)
    return new promise(async (resolve, reject) => {
      existingUser = await db
        .get()
        .collection(collection.User_Collection)
        .findOne({"isVerified": true, email: user.loginEmail });
      if (existingUser) {
        if (await bcrypt.compare(user.loginPassword, existingUser.password)) {
          // console.log('user logedin')
          // console.log(existingUser)
          resolve({
            status: true,
            userName: existingUser.name,
            userId: existingUser._id,
          });
        } else {
          reject({ status: false });
        }
      } else {
        reject({ status: false });
      }
    });
  },
  forgotPassword: ({ email }) => {
    return new Promise(async(resolve, reject) => {
      const user = await db.get().collection(collection.User_Collection).findOne({ email });
      // console.log(user);
      if (!user) {
        reject({ error: 'No user found with this email' });
      }else{
        const otp = crypto.randomInt(1000, 9999).toString(); // Generate a 4-digit OTP
        const expirationTime = Date.now() + 3600000; // 1 hour
        await db.get().collection(collection.User_Collection).updateOne(
          { email },
          {
            $set: {
              resetPasswordOtp: otp,
              resetPasswordExpires: expirationTime,
            },
          }
        );
        const otpRes=await sendOtp(email,otp)
        resolve(otpRes)
      }
    })

  },
  resetPassword:({email,otp,newPassword}) =>{
    // console.log(email,otp,newPassword)
    return new Promise(async(resolve, reject) => {
      const user = await db.get().collection(collection.User_Collection).findOne({ email, resetPasswordOtp: otp,  resetPasswordExpires: { $gt: Date.now() } });
      
      if (!user) {
        // console.log('no user found')
        reject({ error: 'Invalid OTP or OTP has expired' });
      }else{
        const saltRounds = 10;
       password = await bcrypt.hash(newPassword, saltRounds);
        await db.get().collection(collection.User_Collection).updateOne(
          { email },
          {
            $set: {
              password: password,
              resetPasswordOtp: null,
              resetPasswordExpires: null,
            },
          }
        );
        resolve({ success: true });
      }
    })

  },
  getUserItineraries:(userId)=>{
    return new Promise((resolve, reject) =>{
      const itineraries = db.get().collection(collection.ITINERARY_Collection).find({userId}).toArray()
      if(itineraries){
        resolve(itineraries)
      }else{
        reject({ error: 'No itineraries found' })
      }
    })
  }

}