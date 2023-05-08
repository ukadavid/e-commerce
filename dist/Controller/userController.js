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
exports.Register = void 0;
const uuid_1 = require("uuid");
const utility_1 = require("../utils/utility");
const notification_1 = require("../utils/notification");
const config_1 = require("../config");
const userModel_1 = __importDefault(require("../Model/userModel"));
/**============= Register ================*/
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { email, password, confirm_password, firstname, lastname, phone } = req.body;
        const validateResult = utility_1.registerSchema.validate(req.body, utility_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        // Generate Salt
        const salt = yield (0, utility_1.generateSalt)();
        const userPassword = yield (0, utility_1.GenerateHashPassword)(password, salt);
        //Generate OTP
        const { otp, expiry } = yield (0, notification_1.GenerateOtp)();
        // Check if user exist
        const user = yield userModel_1.default.findOne({ where: { email } });
        // Create User
        if (!user) {
            const user = yield userModel_1.default.create({
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
            const html = (0, notification_1.emailHtml)(otp);
            yield (0, notification_1.SendMail)(email, config_1.FROM_ADMIN_MAIL, html, config_1.USER_SUBJECT);
            return res.status(201).json({
                message: "User Created Successfully",
                user,
            });
        }
        return res.status(400).json({
            Error: "User already exist",
        });
    }
    catch (error) {
        return res.status(500).json({
            Error: "Internal Server Error",
            route: "users/signup",
        });
    }
});
exports.Register = Register;
