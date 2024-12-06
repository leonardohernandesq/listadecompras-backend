import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/Router";  // Roteamento
import "./config/db";  // Conexão com o banco

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(router);

// Não usamos app.listen no Vercel, em vez disso, exportamos o app.
export default app;
