import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const sendEmail = (userEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.EmailPass
    }
  });

  const mailOptions = {
    from: 'PostIt Messaging Application',
    to: userEmail,
    subject,
    html: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      winston.log(error);
    } else {
      winston.info('Email sent: ', info.response);
    }
  });
};


export default sendEmail;
