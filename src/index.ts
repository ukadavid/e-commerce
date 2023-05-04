import express, { Request, Response } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./config/index";

dotenv.config();

/*  ========  SEQUELIZE CONNECTION ========== */

db.sync()
  .then(() => {
    console.log(`DB Connected Successfully`);
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.use(logger("dev"));

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
