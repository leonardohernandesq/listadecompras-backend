import { body } from "express-validator";

export const categoryCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome da categoria é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome da categoria precisa ter no mínimo 3 caracteres."),
    ];
};

export const categoryUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isString().withMessage("O nome da categoria precisa ser uma string válida.")
            .isLength({ min: 3 }).withMessage("O nome da categoria precisa ter no mínimo 3 caracteres."),
    ];
};
