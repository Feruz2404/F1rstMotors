import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Client } from '../clients/models/client.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(client: Client, OTP:string) {
    await this.mailerService.sendMail({
      to: client.email,
      subject: 'Welcome to F1rstMotors',
      template: './confirm',
      context: {
        full_name: client.full_name,
        OTP,
      },
    });
  }
}
