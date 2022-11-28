/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import configs from '../config/emailservice-config';
require('dotenv').config();

const nodemailer = require('nodemailer');

@Injectable()
export class EmailSender {
  private transporter = nodemailer.createTransport({
    service: configs().service,
    auth: {
      user: configs().user,
      pass: configs().pass,
    },
  });

  public async sendemail(email: string, text: string): Promise<void> {
    const mailOptions = {
      from: configs().corporateMail,
      to: email,
      subject: 'обновленный пароль',
      text: text,
    };
    this.transporter.sendMail(mailOptions);
  }
}
