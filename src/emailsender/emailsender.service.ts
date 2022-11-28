/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import configs from '../config/config';
require('dotenv').config();

const nodemailer = require('nodemailer');

@Injectable()
export class EmailSender {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configs().nodemailer.user,
      pass: configs().nodemailer.pass,
    },
  });

  public async sendemail(email: string, text: string): Promise<void> {
    const mailOptions = {
      from: configs().nodemailer.fromEmail,
      to: email,
      subject: 'обновленный пароль',
      text: text,
    };
    this.transporter.sendMail(mailOptions);
  }
}
