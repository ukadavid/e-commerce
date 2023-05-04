import { Sequelize } from "sequelize";

const db_port = Number(process.env.DB_PORT);
const db_password = String(process.env.DB_PASSWORD);

export const db = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: db_port,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: db_password,
});
