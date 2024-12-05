import { Router } from "express";
import { shoppingListCreateValidation, shoppingListUpdateValidation } from "../middlewares/shoppingListValidation";
import { validate } from "../middlewares/handleValidation";
import { createShoppingList, updateShoppingList, deleteShoppingList, getAllShoppingLists, addItemToShopping, getShoppingListById, deleteItemToShopping, markItemAsBoughtInList } from "../controllers/ShoppingListController";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

// Criar nova lista de compras
router.post("/", authGuard, shoppingListCreateValidation(), validate, createShoppingList);

router.put("/add", authGuard, addItemToShopping);
router.put("/remove", authGuard, deleteItemToShopping);

// Atualizar uma lista de compras
router.put("/:id", authGuard, shoppingListUpdateValidation(), validate, updateShoppingList);

router.put("/bought/:itemId", authGuard, markItemAsBoughtInList)

// Deletar uma lista de compras
router.delete("/:id", authGuard, deleteShoppingList);

// Obter todas as listas de compras
router.get("/", authGuard, getAllShoppingLists);

router.get("/:id", authGuard, getShoppingListById)

export default router;
