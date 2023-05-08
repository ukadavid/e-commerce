"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = exports.SendMail = exports.GenerateOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
// OTP function
const GenerateOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
});
exports.GenerateOtp = GenerateOtp;
// Mail Function
let transport = nodemailer_1.default.createTransport({
    host: config_1.SENDINBLUE_HOST,
    port: config_1.SENDINBLUE_PORT,
    auth: {
        user: config_1.SENDINBLUE_USER,
        pass: config_1.SENDINBLUE_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const SendMail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield transport.sendMail({
            from: config_1.FROM_ADMIN_MAIL,
            to,
            subject: config_1.USER_SUBJECT,
            html,
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.SendMail = SendMail;
const emailHtml = (otp) => {
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
exports.emailHtml = emailHtml;
// SMTP Server
// smtp-relay.sendinblue.com
// Port
// 587
// Login
// ukadavid7@gmail.com
