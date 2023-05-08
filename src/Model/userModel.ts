import { sequelize, DataTypes, Sequelize } from "../db/db";

// export interface UserAttributes {
//   id: string;
//   email: string;
//   password: string;
//   firstname: string;
//   lastname: string;
//   address: string;
//   phone: string;
//   otp: number;
//   otp_expiry: Date;
//   lng: number;
//   lat: number;
//   verified: boolean;
//   salt: string;
//   role: string;
// }
export const UserModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Password is required",
      },
    },
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  otp_expiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lng: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default UserModel;
