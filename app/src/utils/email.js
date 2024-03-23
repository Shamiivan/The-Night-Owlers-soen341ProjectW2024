// utils/email.js

const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@example.com', // your email
    pass: 'your_password', // your password
  },
});

// Function to send an email
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'your_email@example.com', // sender address
      to, // list of receivers
      subject, // Subject line
      html, // HTML body
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
