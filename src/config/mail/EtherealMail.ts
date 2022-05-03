import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    console.log('antes');
    const account = await nodemailer.createTestAccount();
    console.log(account);
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: 'equipe@appivendas.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
  }
}
