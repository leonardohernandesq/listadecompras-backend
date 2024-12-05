import { Request, Response } from "express";
import { CategoryModel } from "../models/CategoryModel";
import mongoose from "mongoose";

// Criar uma nova categoria
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        // Criar nova categoria
        const newCategory = new CategoryModel({
            name,
            user: req.user._id,  // Supondo que o middleware de autenticação injete o user no req
        });

        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar categoria" });
    }
};

// Obter todas as categorias do usuário
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryModel.find({ user: req.user._id });

        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar categorias" });
    }
};

// Obter uma categoria específica pelo ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o ID é um ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de categoria inválido" });
        }

        const category = await CategoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar categoria" });
    }
};

// Remover uma categoria
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Procurar a categoria
        const category = await CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        // Remover a categoria
        await CategoryModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Categoria removida com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover categoria" });
    }
};
