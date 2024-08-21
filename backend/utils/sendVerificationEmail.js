const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // For development only
  },
});

const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: `TripTide <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification - TripTide',
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
    return {msg:'A verification email has been sent to ' + email + '.'};
  } catch (error) {
    return {error:' An Error occured , try again ' }
  }
};

module.exports = sendVerificationEmail;
