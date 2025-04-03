// app.ts

import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/Router";
import "./config/db";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(router);

export default app; // <--- Exporta aqui
