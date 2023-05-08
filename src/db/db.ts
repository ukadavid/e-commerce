import { Sequelize, DataTypes } from "sequelize";
require("dotenv").config()

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;

const sequelize = new Sequelize(POSTGRES_URL)

// Sequelize connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

export { sequelize, Sequelize, DataTypes, connectDB };