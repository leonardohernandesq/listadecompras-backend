import { Router } from "express";
import { categoryCreateValidation } from "../middlewares/categoryValidation";
import { validate } from "../middlewares/handleValidation";
import { createCategory, deleteCategory, getAllCategories, getCategoryById } from "../controllers/CategoryController";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

// Criar nova categoria
router.post("/", authGuard, categoryCreateValidation(), validate, createCategory);

router.get('/:id', getCategoryById);


// Deletar uma categoria
router.delete("/:id", authGuard, deleteCategory);

// Obter todas as categorias
router.get("/", authGuard, getAllCategories);

export default router;
