import { body } from "express-validator";

export const userCreateValidation = () => {
    return [
        body("name")
            .isString().withMessage("O nome é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("email")
            .isString().withMessage("O email é obrigatório.")
            .isEmail().withMessage("O campo precisa ser um email."),
        body("password")
            .isString().withMessage("A senha é obrigatória.")
            .isLength({ min: 5 }).withMessage("A senha precisa ter no mínimo 5 caracteres."),
        body("confirmPassword")
            .isString().withMessage("A confirmação é obrigatória.")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("As senhas não são iguais.");
                }
                return true;
            }),
    ];
};

export const userLoginValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 }).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        body("password")
            .optional()
            .isLength({ min: 5 }).withMessage("A senha precisa ter no mínimo 5 caracteres."),
    ];
};
