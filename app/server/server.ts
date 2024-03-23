const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nightowler.pj@gmail.com',
    pass: 'NightOwler24'
  }
});

// Route to send confirmation email
app.post('/sendConfirmationEmail', (req, res) => {
  const { customerEmail, orderInfo } = req.body;

  const mailOptions = {
    from: 'nightowler.pj@gmail.com',
    to: customerEmail,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Here is your order information: ${orderInfo}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
