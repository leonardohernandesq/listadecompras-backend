import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";

// Middleware de autenticação
export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Pegar o token do cabeçalho da requisição
        const token = req.header("Authorization")?.replace("Bearer ", "");

        // Verificar se o token foi fornecido
        if (!token) {
            return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
        }

        // Verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        // Decodifica o token e encontra o usuário
        const user = await UserModel.findById((decoded as any).id);

        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado." });
        }

        // Anexar o usuário à requisição (req.user)
        req.user = user;

        // Prosseguir para o próximo middleware ou rota
        next();
    } catch (error) {
        console.error("Erro na autenticação:", error);
        res.status(401).json({ error: "Token inválido ou expirado." });
    }
};
