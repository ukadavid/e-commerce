"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const db_1 = require("../db/db");
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
exports.UserModel = db_1.sequelize.define("user", {
    id: {
        type: db_1.DataTypes.UUID,
        defaultValue: db_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: db_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: db_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
        },
    },
    firstname: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    otp: {
        type: db_1.DataTypes.INTEGER,
        allowNull: true,
    },
    otp_expiry: {
        type: db_1.DataTypes.DATE,
        allowNull: true,
    },
    lng: {
        type: db_1.DataTypes.FLOAT,
        allowNull: true,
    },
    lat: {
        type: db_1.DataTypes.FLOAT,
        allowNull: true,
    },
    verified: {
        type: db_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    role: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: db_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.default = exports.UserModel;
