import { body } from "express-validator";

export const shoppingListCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome da lista é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome da lista precisa ter no mínimo 3 caracteres."),
    ];
};

export const shoppingListUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isString().withMessage("O nome da lista precisa ser uma string válida.")
            .isLength({ min: 3 }).withMessage("O nome da lista precisa ter no mínimo 3 caracteres."),
    ];
};
