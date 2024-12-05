import { Request, Response } from "express";
import { ShoppingListModel } from "../models/ShoppingListModel";
import { ShoppingItemModel } from "../models/ShoppingItemModel";
import mongoose from "mongoose";

export const createShoppingList = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const newList = new ShoppingListModel({
            name,
            user: req.user._id,
            items: []
        });

        const savedList = await newList.save();

        res.status(201).json(savedList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar lista de compras" });
    }
};

export const getAllShoppingLists = async (req: Request, res: Response) => {
    try {
        const shoppingLists = await ShoppingListModel.find({ user: req.user._id });

        res.status(200).json(shoppingLists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar listas de compras" });
    }
};

export const getShoppingListById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const shoppingList = await ShoppingListModel.findById(id);

        res.status(200).json(shoppingList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar listas de compras" });
    }
};

export const updateShoppingList = async (req: Request, res: Response) => {
    try {
        const { listId } = req.params;
        const { name } = req.body;

        // Procurar a lista
        const shoppingList = await ShoppingListModel.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }

        // Atualizar os campos
        shoppingList.name = name || shoppingList.name;

        const updatedList = await shoppingList.save();

        res.status(200).json(updatedList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar lista de compras" });
    }
};

export const deleteShoppingList = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const shoppingList = await ShoppingListModel.findById(id);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }

        await ShoppingListModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Lista de compras removida com sucesso", id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover lista de compras" });
    }
};

export const addItemToShopping = async (req: Request, res: Response) => {
    try {
        const { itemId, listId, quantity, bought } = req.body;
    
        const shoppingList = await ShoppingListModel.findById(listId);
        const shoppingItem = await ShoppingItemModel.findById(itemId);
    
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compra não encontrada" });
        }
    
        if (!shoppingItem) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
    
        // Verifica se o item já existe na lista
        const itemExists = shoppingList.items.some(
            (uniqueItem) => uniqueItem._id.toString() === itemId.toString()
        );

        if (itemExists) {
            return res.status(422).json({ error: "O item já existe na lista" });
        }

        shoppingList.items.push({
            _id: itemId,
            quantity: quantity || 1, 
            bought: bought || false,
        });
    
        const newList = await shoppingList.save();
    
        res.status(200).json(newList);
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar o item na lista." });
    }
};

// Marcar item como comprado dentro da lista de compras
export const markItemAsBoughtInList = async (req: Request, res: Response) => {
    try {
        const { itemId } = req.params;
        const { listId } = req.body;

        // Procurar a lista de compras pelo ID
        const shoppingList = await ShoppingListModel.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }

        // Procurar o item dentro da lista de compras
        const item = shoppingList.items.find(
            (uniqueItem) => uniqueItem._id.toString() === itemId.toString()
        );

        if (!item) {
            return res.status(404).json({ error: "Item não encontrado na lista" });
        }

        // Alternar o status de "bought"
        item.bought = !item.bought;

        // Salvar a lista de compras atualizada
        const updatedList = await shoppingList.save();

        // Retornar a lista de compras atualizada
        res.status(200).json(updatedList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao marcar item como comprado" });
    }
};

export const deleteItemToShopping = async (req: Request, res: Response) => {
    try {
        const { itemId, listId } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: "ID do item inválido" });
        }
    
        const shoppingList = await ShoppingListModel.findById(listId);
    
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compra não encontrada" });
        }
    
        shoppingList.items.pull({ _id: itemId });
    
        const newList = await shoppingList.save();
    
        res.status(200).json(newList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar o item na lista." });
    }
};
    
    