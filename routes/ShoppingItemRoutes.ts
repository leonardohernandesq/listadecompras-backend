import { Router } from "express";
import { shoppingItemCreateValidation, shoppingItemUpdateValidation } from "../middlewares/shoppingItemValidation";
import { validate } from "../middlewares/handleValidation";
import { createShoppingItem, updateShoppingItem, deleteShoppingItem, getAllShoppingItems, getShoppingItemById, getShoppingItemByCategory } from "../controllers/ShoppingItemController";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

// Criar novo item de compra
router.post("/", authGuard, shoppingItemCreateValidation(), validate, createShoppingItem);

// Atualizar um item de compra
router.put("/:id", authGuard, shoppingItemUpdateValidation(), validate, updateShoppingItem);

// Deletar um item de compra
router.delete("/:id", authGuard, deleteShoppingItem);


router.get("/", authGuard, getAllShoppingItems);
router.get("/category/:categoryId", authGuard, getShoppingItemByCategory);
router.get("/:id", authGuard, getShoppingItemById);


export default router;
