import nodemailer from 'nodemailer';
import storage from '../storage';

export function sendEmail(req, res, next) {
  const { firstName, lastName, email, message } = req.body;
  const mailOptions = {
    to: 'chadtmiller15@gmail.com',
    subject: `Contact Form Message - ${firstName} ${lastName}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email} \n
      ${message}
    `
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chadtmiller15@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

  storage.db
    .collection('contacts')
    .updateOne(
      { firstName, lastName },
      { firstName, lastName, email },
      { upsert: true }
    )
    .then(() => {
      console.log('contact saved');

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.warn(err);
          res.sendStatus(500);
        } else {
          console.log(info);
          res.sendStatus(200);
        }
      });
    })
    .catch(err => {
      console.warn('error saving contact', err);
    });
}
