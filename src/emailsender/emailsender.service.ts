/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';

require('dotenv').config();

const nodemailer = require('nodemailer');

@Injectable()
export class EmailSender {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'darts.club2022',
      pass: 'ofagsyuqlazgllzf',
    },
  });

  sendemail(email: string, text: string) {
    const mailOptions = {
      from: 'darts.club2022@gmail.com',
      to: email,
      subject: 'обновленный пароль',
      text: text,
    };
    this.transporter.sendMail(mailOptions);
  }
}
