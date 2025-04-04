import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;



const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@listadecompras.t20xe.mongodb.net/?retryWrites=true&w=majority&appName=listadecompras`);

        console.log("Conectou ao banco");

        return dbConn;
    } catch (error) {
        console.error("Erro ao conectar ao banco:", error);
        throw error;
    }
};

conn();

export default conn;
