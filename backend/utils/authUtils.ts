import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import db from '../config/connection';
import collection from '../config/collection';

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // For development only
  },
});

const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
  console.log(verificationLink)
  const mailOptions = {
    from: `TripTide <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification - TripTide",
    text: `Dear User,

Thank you for signing up with TripTide. Please click the link below to verify your email address:

${verificationLink}

If you did not sign up for an account, please ignore this email.

Best regards,
TripTide`,
    html: `
      <p>Dear User,</p>
      <p>Thank you for signing up with TripTide. Please click the link below to verify your email address:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
      <p>If you did not sign up for an account, please ignore this email.</p>
      <p>Best regards,<br>TripTide</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { msg: "A verification email has been sent to " + email + "." };
  } catch (error) {
    return { error: " An Error occurred , try again " };
  }
};


const checkExistingUser = async (email: string) => {
  const dbInstance = db.get();
  if (!dbInstance) throw new Error("Database not initialized");

  const user = await dbInstance
    .collection(collection.User_Collection)
    .findOne({ email: { $eq: email } });
  return user;
};


const hashPassword = async (password: string) => {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  return bcrypt.hash(password, saltRounds);
};

const sendOtp = async (email: string, otp: string) => {

  const mailOptions = {
    from: `TripTide <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Triptide Password Reset OTP',
    text: `
    Dear User,

    You are receiving this email because you (or someone else) have requested a password reset for your Triptide account.

    Your OTP (One-Time Password) is: ${otp}

    If you did not request this, please ignore this email and your password will remain unchanged.

    Best regards,
    The Triptide Team

    If you have any questions, feel free to contact us at support@triptide.com.
  `,
    html: `
    <html>
      <body>
        <p>Dear User,</p>
        <p>You are receiving this email because you (or someone else) have requested a password reset for your Triptide account.</p>
        <p><strong>Your OTP (One-Time Password) is:</strong> ${otp}</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>Best regards,<br>The Triptide Team</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@triptide.com">support@triptide.com</a>.</p>
      </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { msg: 'An Otp has been sent to ' + email + '.' };
  } catch (error) {
    console.error(error)
    throw new Error(' Failed to send OTP. Please try again.')
  }
};

// Exporting functions individually
export { sendVerificationEmail, checkExistingUser, hashPassword, sendOtp };
export default { sendVerificationEmail, checkExistingUser, hashPassword, sendOtp }; // Keep default for backward compatibility if needed, but prefer named
