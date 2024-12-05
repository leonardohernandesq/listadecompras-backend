import { body } from "express-validator";

export const shoppingItemCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome do item é obrigatório.")
            .isLength({ min: 2 }).withMessage("O nome do item precisa ter no mínimo 2 caracteres."),
        body("price")
            .optional()
            .isFloat({ min: 0 }).withMessage("O preço precisa ser um número positivo."),
        body("categoryId")
            .optional()
            .isMongoId().withMessage("O ID da categoria precisa ser válido."),
    ];
};

export const shoppingItemUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isString().withMessage("O nome do item precisa ser uma string válida.")
            .isLength({ min: 2 }).withMessage("O nome do item precisa ter no mínimo 2 caracteres."),
        body("price")
            .optional()
            .isFloat({ min: 0 }).withMessage("O preço precisa ser um número positivo."),
        body("categoryId")
            .optional()
            .isMongoId().withMessage("O ID da categoria precisa ser válido."),
    ];
};
