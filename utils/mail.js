const nodemailer = require('nodemailer');

const sendMail = (to, text) => {
  const mailOptions = {
    subject: 'You Have a Down Resource',
    from: process.env.EMAIL,
    to,
    text,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = sendMail;
