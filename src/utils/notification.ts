import nodemailer from "nodemailer";
import {
  SENDINBLUE_HOST,
  SENDINBLUE_PASSWORD,
  SENDINBLUE_USER,
  SENDINBLUE_PORT,
  FROM_ADMIN_MAIL,
  USER_SUBJECT,
} from "../config";
// OTP function
export const GenerateOtp = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

// Mail Function
let transport = nodemailer.createTransport({
  host: SENDINBLUE_HOST,
  port: SENDINBLUE_PORT,
  auth: {
    user: SENDINBLUE_USER,
    pass: SENDINBLUE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const SendMail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await transport.sendMail({
      from: FROM_ADMIN_MAIL,
      to,
      subject: USER_SUBJECT,
      html,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const emailHtml = (otp: number): string => {
  const temp = `  
  <div style="background-color: #f2f2f2; padding: 50px 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 50px;">
    <div style="text-align: center;">
      <h1 style="font-size: 30px; color: #333; margin-bottom: 20px;">Welcome to <span style="color: #00bcd4;">Ecommerce</span></h1>
      <p style="font-size: 16px; color: #777; line-height: 30px;">Your One Time Password (OTP) is <span style="color: 
      #00bcd4;">${otp}</span></p>
    </div>
  </div>
</div>  `;

  return temp;
};
// SMTP Server
// smtp-relay.sendinblue.com
// Port
// 587
// Login
// ukadavid7@gmail.com
