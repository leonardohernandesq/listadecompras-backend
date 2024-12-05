import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

// Registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o usuário já existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        // Criptografar senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Criar novo usuário
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Retornar o novo usuário
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};

// Fazer login de usuário
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Procurar usuário por email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Verificar a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

        // Retornar o token e os dados do usuário
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
};

// Atualizar perfil do usuário
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        // Procurar o usuário
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Atualizar o nome, se fornecido
        if (name) user.name = name;

        // Atualizar a senha, se fornecida
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        // Retornar o usuário atualizado
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;

        // Verifique se o token foi fornecido no cabeçalho de autorização
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: "Token não fornecido" });
        }

        // Extrair o token da string "Bearer <token>"
        const token = authHeader.split(' ')[1];

        // Verificar e decodificar o token
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido" });
            }

            // Verificar se o token foi decodificado corretamente
            const userData = decoded as JwtPayload;

            // Retornar o ID do usuário se o token for válido
            return res.status(200).json({ message: "Token válido", userId: userData.id });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao verificar token" });
    }
};
