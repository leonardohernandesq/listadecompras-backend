import { Request, Response } from "express";
import { ShoppingItemModel } from "../models/ShoppingItemModel";

// Criar um novo item na lista de compras
export const createShoppingItem = async (req: Request, res: Response) => {
    try {
        const { name, categoryId } = req.body;
        // Criar o novo item
        const newItem = new ShoppingItemModel({
            name,
            user: req.user._id,
            categoryId
        });

        // Salvar o novo item
        const savedItem = await newItem.save();

        // Retornar o item criado
        res.status(201).json(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar item de compras" });
    }
};

// Atualizar um item na lista de compras
export const updateShoppingItem = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const { name } = req.body;

        // Procurar o item pelo ID
        const item = await ShoppingItemModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        // Atualizar as propriedades do item
        item.name = name || item.name;

        // Salvar as atualizações
        const updatedItem = await item.save();

        // Retornar o item atualizado
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar item de compras" });
    }
};

// Remover um item da lista de compras
export const deleteShoppingItem = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verificar se o item existe
        const item = await ShoppingItemModel.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        // Remover o item
        await ShoppingItemModel.findByIdAndDelete(id);

        // Retornar a confirmação de remoção
        res.status(200).json({ message: "Item removido com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover item de compras" });
    }
};

// Obter todos os itens de compra
export const getAllShoppingItems = async (req: Request, res: Response) => {
    try {
        const items = await ShoppingItemModel.find({ user: req.user._id }); // Filtra por usuário autenticado
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter itens de compras" });
    }
};

// Obter um item de compra por ID
export const getShoppingItemById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const item = await ShoppingItemModel.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter item de compras" });
    }
};

// Obter itens de compra por categoria
export const getShoppingItemByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        // Busca diretamente por categoryId sem conversão para ObjectId
        const items = await ShoppingItemModel.find({ categoryId });

        if (items.length === 0) {
            return res.status(404).json({ error: "Nenhum item encontrado para essa categoria" });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter itens de compras" });
    }
};

