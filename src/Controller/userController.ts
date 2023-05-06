import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import {
  GenerateHashPassword,
  generateSalt,
  options,
  registerSchema,
} from "../utils/utility";
import { GenerateOtp } from "../utils/notification";
import { UserInstance } from "../Model/userModel";

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
    const user = await UserInstance.findOne({ where: { email } });

    // Create User
    if (!user) {
      const user = await UserInstance.create({
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
      res.status(201).json({
        message: "User Created Successfully",
        user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Error: "Internal Server Error",
      route: "users/signup",
    });
  }
};
