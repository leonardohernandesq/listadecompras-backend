import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/Router";
import "./config/db";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


app.use(router);

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
