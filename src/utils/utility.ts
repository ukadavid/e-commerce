import Joi from "joi";
import bcrypt from "bcryptjs";

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

/** ========== Generate Salt ====== */
export const generateSalt = async () => {
  const salt = await bcrypt.genSalt();
  return salt;
};

export const GenerateHashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};
