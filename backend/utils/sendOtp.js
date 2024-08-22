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

const sendOtp = async (email, otp) => {
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
    return {msg:'An Otp has been sent to ' + email + '.'};
  } catch (error) {
    return {error:' An Error occured , try again ' }
  }
};

module.exports = sendOtp;
