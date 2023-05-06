import express from "express";
import { Register } from "../Controller/userController";

const router = express.Router();

router.post("/signup", Register);

export default router;