"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const db_port = Number(process.env.DB_PORT);
const db_password = String(process.env.DB_PASSWORD);
exports.db = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: db_port,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: db_password,
});
