import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import {
  GenerateHashPassword,
  generateSalt,
  options,
  registerSchema,
} from "../utils/utility";
import { GenerateOtp, emailHtml, SendMail } from "../utils/notification";
import { FROM_ADMIN_MAIL, USER_SUBJECT } from "../config";
import UserModel from "../Model/userModel";

/**============= Register ================*/
export const Register = async (req: Request, res: Response) => {
  try {
    const id = uuid();
    const { email, password, confirm_password, firstname, lastname, phone } =
      req.body;
    const validateResult = registerSchema.validate(req.body, options);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    // Generate Salt
    const salt = await generateSalt();
    const userPassword = await GenerateHashPassword(password, salt);

    //Generate OTP
    const { otp, expiry } = await GenerateOtp();

    // Check if user exist
    const user = await UserModel.findOne({ where: { email } });

    // Create User
    if (!user) {
      const user = await UserModel.create({
        id,
        email,
        password: userPassword,
        firstname,
        lastname,
        salt,
        address: "",
        phone,
        otp,
        otp_expiry: expiry,
        lat: 0,
        lng: 0,
        verified: false,
        role: "buyer",
      });

      // Send Email
      const html = emailHtml(otp);
      await SendMail(email, FROM_ADMIN_MAIL, html, USER_SUBJECT);


      return res.status(201).json({
        message: "User Created Successfully",
        user,
      });
    }
    return res.status(400).json({
      Error: "User already exist",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "users/signup",
    });
  }
};
