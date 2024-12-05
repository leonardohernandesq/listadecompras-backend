import { Router } from "express";
import { userCreateValidation, userLoginValidation } from "../middlewares/userValidations";
import { validate } from "../middlewares/handleValidation";
import { registerUser, loginUser, updateUser, verifyToken } from "../controllers/UserController";
import { authGuard } from "../middlewares/authGuard";

const router = Router();

// Registro de usuário
router.post("/register", userCreateValidation(), validate, registerUser);

// Login de usuário
router.post("/login", userLoginValidation(), validate, loginUser);

// Atualização de perfil (requer autenticação)
router.put("/profile", authGuard, updateUser);

router.get("/verify-token", verifyToken);


export default router;
