import express, { Request, Response } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize, Sequelize } from "./db/db";
import buyerRouter from "./routes/buyerRoute";
dotenv.config();

/*  ========  SEQUELIZE CONNECTION ========== */

const app = express();

app.use(express.json());

app.use(logger("dev"));

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);

/** Routes */
app.use("/users", buyerRouter);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("Database Synced created!");
  });
});
